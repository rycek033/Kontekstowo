import { useState, useRef, useEffect } from 'react';
import type { Room, SceneObject } from './types';

const THEME_KEY = 'kontekstowo-theme';

function App() {
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [feedback, setFeedback] = useState<string>('Posłuchaj dźwięku i wskaż odpowiedni przedmiot.');
  const [targetId, setTargetId] = useState<string | null>(null);
  const [inventory, setInventory] = useState<SceneObject[]>([]);
  const [selectedItem, setSelectedItem] = useState<SceneObject | null>(null);
  const [isDark, setIsDark] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme === 'dark') return true;
    if (savedTheme === 'light') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const playAudioWithLimit = (src: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    const audio = new Audio(src);
    audioRef.current = audio;
    audio.play();

    timeoutRef.current = window.setTimeout(() => {
      audio.pause();
      audio.currentTime = 0;
    }, 5000);
  };

  const startRound = (items: SceneObject[]) => {
    if (items.length === 0) {
      setTargetId(null);
      setFeedback('Gratulacje! Zebrałeś wszystkie przedmioty.');
      return;
    }

    const randomObj = items[Math.floor(Math.random() * items.length)];
    setTargetId(randomObj.id);
    playAudioWithLimit(randomObj.sound_src);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/rooms/Bedroom');
        if (!response.ok) {
          throw new Error('Failed to fetch room data');
        }
        const data = await response.json();
        const mappedRoom: Room = {
          id: data.id,
          name: data.name,
          background_src: data.background_src,
          items: data.items.map((item: SceneObject) => ({
            id: item.id,
            name: item.name,
            src: item.src,
            sound_src: item.sound_src,
            voice_src: item.voice_src,
            top: item.top,
            left: item.left,
            width: item.width
          }))
        };
        setRoom(mappedRoom);
        startRound(mappedRoom.items);
      } catch (error) {
        setFeedback('Nie udało się załadować sceny. Spróbuj ponownie później.');
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, []);

  const handleObjectClick = (clickedObj: SceneObject) => {
    playAudioWithLimit(clickedObj.sound_src);

    if (clickedObj.id === targetId) {
      setFeedback(`Brawo! To jest ${clickedObj.name.toUpperCase()}.`);
      setInventory((prev) => [...prev, clickedObj]);
      setRoom((prev) => {
        if (!prev) return null;
        const remainingItems = prev.items.filter((item) => item.id !== clickedObj.id);
        const updatedRoom = { ...prev, items: remainingItems };
        startRound(remainingItems);
        return updatedRoom;
      });
    } else {
      setFeedback('To nie to. Spróbuj posłuchać jeszcze raz!');
    }
  };

  const handleInventoryClick = (item: SceneObject) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  const playVoice = (src: string) => {
    const voiceAudio = new Audio(src);
    voiceAudio.play();
  };

  const replaySound = () => {
    if (!room) return;
    const target = room.items.find((item) => item.id === targetId);
    if (target) {
      playAudioWithLimit(target.sound_src);
    }
  };

  const themeButton = (
    <button
      onClick={toggleTheme}
      className="w-10 h-10 inline-flex items-center justify-center rounded-lg bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100 transition-colors shrink-0"
    >
      <i className={`${isDark ? 'fas fa-sun' : 'fas fa-moon'} fa-fw text-base leading-none`}></i>
    </button>
  );

  return (
    <div>
      {loading && (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
          <header className="absolute top-4 right-4">
            {themeButton}
          </header>
          <h1 className="text-4xl font-bold mb-4">Kontekstowo</h1>
          <p className="text-lg">Ładowanie sceny...</p>
        </div>
      )}

      {!loading && !room && (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
          <header className="absolute top-4 right-4">
            {themeButton}
          </header>
          <h1 className="text-4xl font-bold mb-4">Kontekstowo</h1>
          <p className="text-lg">{feedback}</p>
        </div>
      )}

      {!loading && room && (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
          <header className="py-6 px-4 flex items-center justify-between">
            <h1 className="text-3xl md:text-4xl font-bold text-center flex-grow">Kontekstowo</h1>
            <div className="flex-shrink-0">
              {themeButton}
            </div>
          </header>

          <div className="px-4 py-3 bg-white dark:bg-gray-800 shadow-sm text-center">
            <span className="text-base md:text-lg">{feedback}</span>
            {room.items.length > 0 && (
              <button
                onClick={replaySound}
                className="ml-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600 text-white rounded-lg transition-colors"
              >
                <i className="fas fa-volume-high mr-2"></i>
                Powtórz dźwięk
              </button>
            )}
          </div>

          <main className="flex-grow flex items-center justify-center p-4">
            <div className="relative w-full max-w-5xl rounded-xl overflow-hidden shadow-lg dark:shadow-gray-900">
              <img
                src={room.background_src}
                alt={room.name}
                className="w-full h-auto block"
              />

              {room.items.map((obj) => (
                <img
                  key={obj.id}
                  src={obj.src}
                  alt={obj.name}
                  onClick={() => handleObjectClick(obj)}
                  className="absolute cursor-pointer hover:scale-105 transition-transform duration-200 drop-shadow-md"
                  style={{ top: obj.top, left: obj.left, width: obj.width }}
                />
              ))}
            </div>
          </main>

          <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
            <h2 className="text-lg font-semibold mb-3 text-center">
              <i className="fas fa-toolbox mr-2"></i>
              Przybornik
            </h2>
            <div className="flex justify-center gap-4 flex-wrap min-h-[80px]">
              {inventory.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleInventoryClick(item)}
                  className="w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 border-purple-200 dark:border-purple-900 hover:border-purple-500 dark:hover:border-purple-400 transition-colors shadow-sm"
                >
                  <img
                    src={item.src}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {selectedItem && (
            <div
              className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
              onClick={closeModal}
            >
              <div
                className="relative bg-white dark:bg-gray-800 p-4 pb-6 rounded shadow-2xl max-w-sm w-full text-center"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={closeModal}
                  className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                >
                  <i className="fas fa-times text-xl"></i>
                </button>

                <img
                  src={selectedItem.src}
                  alt={selectedItem.name}
                  className="w-full h-auto mb-4 rounded border border-gray-100 dark:border-gray-700"
                />

                <div
                  className="inline-flex items-center gap-2 text-xl font-medium cursor-pointer hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  onClick={() => playVoice(selectedItem.voice_src)}
                >
                  <span>{selectedItem.name}</span>
                  <i className="fas fa-volume-up"></i>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;

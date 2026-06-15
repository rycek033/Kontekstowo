export interface SceneObject {
    id: string;
    name: string;
    src: string;          
    sound_src: string;     
    voice_src: string;    
    top: string;
    left: string;
    width: string;
}

export interface Room {
    id: number;
    name: string;
    background_src: string;
    items: SceneObject[];
}

export interface QuizState {
    targetObjectId: string | null;
    isAnsweredCorrectly: boolean;
}

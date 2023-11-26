export type TrainingData = {
    name: string,
    timestamp: string,
    expires: string | null
}

export type Person = {
    name: string;
    completions: TrainingData[]
}

export type TrainingList = {
    name: string,
    count: number
}
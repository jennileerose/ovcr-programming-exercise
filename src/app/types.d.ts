export type TrainingData = {
    name: string,
    timestamp: Date,
    expires: string | null
}

export type TrainingDataStringified = {
    name: string,
    timestamp: string,
    expires: string | null,
    expirationStatus?: string
}

export type PersonStringified = {
    name: string;
    completions: TrainingDataStringified[]
}

export type Person = {
    name: string;
    completions: TrainingData[]
}

export type TrainingList = {
    name: string,
    count: number
}
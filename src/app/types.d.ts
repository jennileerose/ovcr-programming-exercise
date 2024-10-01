// TypeScript object for the completed trainings
export type TrainingData = {
    name: string,
    timestamp: Date,
    expires: string | null
}

// TypeScript object for the completed trainings with the timestamps as strings
// This has an optional property of expriationStatus for exercise 3
export type TrainingDataStringified = {
    name: string,
    timestamp: string,
    expires: string | null,
    expirationStatus?: string
}

// TypeScript object for the completed trainings with the timestamps as strings
export type PersonStringified = {
    name: string;
    completions: TrainingDataStringified[]
}

// TypeScript object for the overall People data object
export type Person = {
    name: string;
    completions: TrainingData[]
}

// TypeScript object for exercise 1 with training names and counts
export type TrainingList = {
    name: string,
    count: number
}

// TypeScript object for exercise 2 with custom paramters to set up the multiselect form object
export type TrainingListOptions = {
    value: string,
    label: string
}

// TypeScript object for exercises 2 and 3 for the Display table for both default and custom tables
export type Ex2and3DisplayData = {
    name: string,
    trainingName: string,
    trainingTimestamp: string,
    trainingExpireDate: string | null
    trainingExpirationStatus?: string
}

// TypeScript object for all display columns
export type TableColumn = {
    label: string,
    property: string,
    disableSort: boolean,
    disableFilter: boolean
}
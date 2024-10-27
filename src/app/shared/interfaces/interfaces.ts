export interface CostumerComment {
    name:string,
    comment:string,
    img:string
}

export interface LiveEvent {
    _id: string,
    event: Event,
    status: string,
    __v: number,
    state: string,
    value: string
}

export interface Event {
    _id: string,
    title: string,
    description: string,
    address: string,
    startDate: Date,
    endDate: Date,
    type: string,
    participantApproveType: string,
    creator: string,
    status: string,
    registrationEndDate: Date,
    registrationStartDate: Date,
    __v:  number
}
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



export interface EventDetails {
    event: Event;
    live:ActiveEvent;
    partitions: EventPartition[]
  }
  
  export interface ActiveEvent{
    event:Event;
    state:string;
    status:string;
    value:string;
    _id:string;
  }
  
  export interface Team{
    description:string;
    title:string;
    _id:string;
    members:{
      coach:memberInfo;
      athlete:memberInfo;
      memberType:string;
      status:string
    }[];
  }
  
  export interface memberInfo {
    birthDate:string;
    firstName:string;
    lastName:string;
    pid:string;
    sid:string;
    _id:string;
  }
  
  export interface EventPartition {
      _id: string;
      title: string;
      description?: string;
      address?: string;
      location?: string;
      startDate?: Date;
      endDate?: Date;
      startTime?: string;
      endTime?: string;
      poolLength: string;
      races: Race[];
      type:string
      participantApproveType:string
    }
  
  export interface Event {
    address:string;
    creator:string;
    description:string;
    endDate:Date;
    participantApproveType:string;
    registrationEndDate:Date;
    registrationStartDate:Date;
    startDate:Date;
    status:string;
    starTime:any;
    entTime:any;
    title:string;
    type:string;
    _id:string;
  }
  
  export interface Live {
      live:ActiveEvent;
      partition:EventPartition;
      race:Race;
      result:liveResult;
  }
  
  export interface liveResult {
      event:string;
      lanes:Lane[];
      name:string;
      orderNumber:number;
      partition:string;
      race:string;
      _id:string;
  }
  
  export interface Race {
      isPublished: any;
      title: string;
      description?: string;
      style: string; //enum
      distance: number;//enum
      gender: string;//enum
      hasFinals: boolean;
      hasSemiFinals: boolean;
      orderNumber: number;
      _id:string;
      startTime:string;
      startDate:Date;
      type:string;
      partition:string;
      heats:Heat[]
    }
  
    export interface Heat {
      lanes: Lane[];
      event: string;
      name:string;
      orderNumber:string | number;
      partition:string;
      race:string;
      _id:string;
    }
    
    export interface Lane {
      participant: Participant | Team | any;
      lane: any;
      isPublished:boolean;
      participantId:string;
      raceType:string;
      result:Time;
      resultPoint:number;
      resultType:any;
      place:any
      totalSeconds:any;
    }
  
    export interface Participant {
      birthDate: string;
      firstName: string;
      lastName:string;
      pid:string;
      sid:string;
      _id:Time;
    }
    
    export interface Time {
          hours: any
          minutes: any
          seconds: any
          milliseconds: any
    }

    export interface RankInfo {
      finaPoint:number
      time:Time
    }

  export interface Ranks {
    CANDIDATE: RankInfo
    FIRST: RankInfo
    INTERNATIONAL_MASTER: RankInfo
    JUNIOR_FIRST: RankInfo
    JUNIOR_SECOND: RankInfo
    JUNIOR_THIRD: RankInfo
    MASTER: RankInfo
    SECOND: RankInfo
    THIRD: RankInfo
}

export interface Distances {
  50:Ranks
  100:Ranks
  200:Ranks
  400:Ranks
  800:Ranks
  1500:Ranks
}

export interface Strokes {
  BACKSTROKE: Distances
  BREASTSTROKE: Distances
  FREESTYLE: Distances
  BUTTERFLY: Distances
  MEDLEY: Distances
}

export interface poolCourse {
  LONG:Strokes
  SHORT:Strokes
}
 
export interface GetRanksData {
  rankData: RankData
  rankName:string[]
}

export interface RankData {
  FEMALE:poolCourse
  MALE:poolCourse
}

export interface TransformedRankData {
  distance: string
  gender: string
  poolLength: string
  ranks: Ranks
  style: string
}

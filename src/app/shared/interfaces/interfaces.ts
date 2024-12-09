import { Paging } from "../classes/classes";

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
      team?:Team;
    }

    export interface StartListParticipant {
      _id: string,
      team: {
          _id: string,
          title: string
      },
      athlete: {
          _id: string,
          sid: string,
          pid: string,
          lastName: string,
          firstName: string,
          birthDate: string,
          gender: string
      },
      race: {
          _id: string,
          title: string
      },
      qualificationTime: {
          hours: string,
          milliseconds: string,
          minutes: string,
          seconds: string
      },
      point: number
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
          totalMilliseconds: any
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

export interface Distances<T> {
  50:T
  100:T
  200:T
  400:T
  800:T
  1500:T
}

export interface Strokes<T> {
  BACKSTROKE: Distances<T>
  BREASTSTROKE: Distances<T>
  FREESTYLE: Distances<T>
  BUTTERFLY: Distances<T>
  MEDLEY: Distances<T>
}

export interface poolCourse<T> {
  LONG:Strokes<T>
  SHORT:Strokes<T>
}
 
export interface GetRanksData {
  rankData: RankData
  rankName:string[]
}

export interface RankData {
  FEMALE:poolCourse<Ranks>
  MALE:poolCourse<Ranks>
}

export interface TransformedRankData {
  distance: string
  gender: string
  poolLength: string
  ranks: Ranks
  style: string
}

export interface ContactMessage {
  name: string
  lastName: string
  email: string
  message: Ranks
}

export interface WRTsData {
  FEMALE:poolCourse<BaseTimeWR>
  MALE:poolCourse<BaseTimeWR>
}

export interface BaseTimeWR {
  BASE_TIME:Time;
  WR:Time;
}

export interface SearchAthletePayload {
  data:{userType:string,searchQuery:string};
  paging: Paging;
}
import type { INews } from "../../../package/types/models/news"
import type { ISliderMain } from "../../../package/types/models/sliderMain"
import type { IEvent } from "../../../package/types/models/events"
import type { IProject } from "../../../package/types/models/projects"
import type { IParticipant } from "../../../package/types/models/participant"
import type { ICommittees } from "../../../package/types/models/committee"


export type NewsDocType = INews & Document  
export type SliderMainDocType = ISliderMain & Document
export type EventnDocType = IEvent & Document
export type ProjectDocType = IProject & Document
export type ParticipantDocType = IParticipant & Document
export type CommitteeDocType = ICommittees & Document
export interface TrackEvent {
  event: EventType;
  eventInfo?: Track
}

export interface Track {
  category: any,
  action: any,
  label?: string,
  value?: number,
}

export enum EventType {
  page = 'page',
  CustomEvent = 'Custom Event',

}


export interface AnalyticsModel {
  enable: boolean;
  environmentValue: GTMEnvironment
}


export enum CategoryEvent {
  PAGE = 'Page',
}

export enum ActionEvent {
  VIEW = 'Page change',

}

export enum LabelEvent {
  PAGE_VIEW = 'PAGE_VIEW',
}

export interface GTMEnvironment {
  gtmId?: string | null;
  gtmAuth?: string | null,
  gtmENV?: string | null;
  gtmResourcePath?: string | null;
  CSP_NONCE?: string | null;

}

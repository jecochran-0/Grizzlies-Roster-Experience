// ─── Roster API ──────────────────────────────────────────────────────────────

export interface PlayerStats {
  games: number;
  ppg: number;
  rpg: number;
  apg: number;
  spg: number;
}

export interface FreeAgency {
  isEarlyTerminationOption: boolean | null;
  isPlayerOption: boolean | null;
  isTeamOption: boolean | null;
  isTwoWayFreeAgent: boolean | null;
  news: {
    articleId: string | null;
    articleLabel: string | null;
  };
  teams: {
    new: { id: number | null; abbr: string | null };
    previous: { id: number | null; abbr: string | null };
  };
  type: string | null;
}

export interface RosterPlayer {
  id: number;
  name: string;
  firstName: string;
  lastName: string;
  displayName: string;
  number: string;          // empty string when no jersey number
  position: string;
  positionAbbreviation: string;
  height: string;
  weight: string;          // empty string when unknown
  age: number;
  experience: string;      // "R" for rookies, else year count as string
  country: string;
  merchUrl: string;
  newsUrl: string;
  teamId: number;
  freeAgency: FreeAgency;
  stats: {
    season: PlayerStats;
    career: PlayerStats;
  };
}

export interface RosterApiResponse {
  results: {
    roster: RosterPlayer[];
  };
}

// ─── Player Detail API ────────────────────────────────────────────────────────

export interface PlayerInfo {
  PERSON_ID: number;
  FIRST_NAME: string;
  LAST_NAME: string;
  DISPLAY_FIRST_LAST: string;
  DISPLAY_LAST_COMMA_FIRST: string;
  DISPLAY_FI_LAST: string;
  PLAYER_SLUG: string;
  BIRTHDATE: string;
  SCHOOL: string;
  COUNTRY: string;
  LAST_AFFILIATION: string;
  HEIGHT: string;
  WEIGHT: string;
  SEASON_EXP: number;
  JERSEY: string;
  POSITION: string;
  ROSTERSTATUS: string;
  GAMES_PLAYED_CURRENT_SEASON_FLAG: string;
  TEAM_ID: number;
  TEAM_NAME: string;
  TEAM_ABBREVIATION: string;
  TEAM_CODE: string;
  TEAM_CITY: string;
  PLAYERCODE: string;
  FROM_YEAR: number;
  TO_YEAR: number;
  DLEAGUE_FLAG: string;
  NBA_FLAG: string;
  GAMES_PLAYED_FLAG: string;
  DRAFT_YEAR: string;
  DRAFT_ROUND: string;
  DRAFT_NUMBER: string;
  GREATEST_75_FLAG: string;
  SEASONS: string[];
}

export interface SeasonStats {
  PLAYER_ID: number;
  PLAYER_NAME: string;
  TimeFrame: string;
  PTS: number;
  AST: number;
  REB: number;
  PIE: number;
}

export interface Award {
  PERSON_ID: number;
  FIRST_NAME: string;
  LAST_NAME: string;
  TEAM: string;
  DESCRIPTION: string;
  ALL_NBA_TEAM_NUMBER: string | null;
  SEASON: string;
  MONTH: string | null;
  WEEK: string | null;
  CONFERENCE: string;
  TYPE: string;
  SUBTYPE1: string;
  SUBTYPE2: string;
  SUBTYPE3: string | null;
}

export interface GameLog {
  SEASON_ID: string;
  Player_ID: number;
  Game_ID: string;
  GAME_DATE: string;
  MATCHUP: string;
  WL: string;
  MIN: number;
  FGM: number;
  FGA: number;
  FG_PCT: number;
  FG3M: number;
  FG3A: number;
  FG3_PCT: number;
  FTM: number;
  FTA: number;
  FT_PCT: number;
  OREB: number;
  DREB: number;
  REB: number;
  AST: number;
  STL: number;
  BLK: number;
  TOV: number;
  PF: number;
  PTS: number;
  PLUS_MINUS: number;
  VIDEO_AVAILABLE: number;
  GAME_STATUS: number;
}

export interface VideoAsset {
  video: string;
  width: number;
  height: number;
  duration: number;
  thumbnail: string;
}

export interface Video {
  id: number;
  type: string;
  name: string;
  title: string;
  slug: string;
  permalink: string;
  excerpt: string;
  date: string;
  featuredImage: string;
  videoDuration: string;
  videoDurationSeconds: number;
  videoAssets: {
    "320"?: VideoAsset;
    "960"?: VideoAsset;
    "1280"?: VideoAsset;
    duration: number;
  };
}

export interface TeamRosterEntry {
  TeamID: number;
  SEASON: string;
  LeagueID: string;
  PLAYER: string;
  NICKNAME: string;
  PLAYER_SLUG: string;
  NUM: string | null;
  POSITION: string;
  HEIGHT: string;
  WEIGHT: string;
  BIRTH_DATE: string;
  AGE: number;
  EXP: string;
  SCHOOL: string;
  PLAYER_ID: number;
  HOW_ACQUIRED: string;
}

export interface RotowireNews {
  updateId: string;
  rotoId: string;
  nbaId: string;
  playerCode: string;
  firstName: string;
  lastName: string;
  position: string;
  team: string;
  teamCode: string;
  date: number;
  priority: string;
  headline: string;
  update: string;
  analysis: string;
  injured: string;
  injuredStatus: string;
  injuryLocation: string;
  injuryType: string;
  injuryDetail: string;
  injurySide: string;
  estReturnDate: string;
  formattedDate: string;
}

export interface PlayerDetail {
  type: string;
  pid: number;
  name: string;
  firstName: string;
  lastName: string;
  slug: string;
  permalink: string;
  yearFrom: string;
  yearTo: string;
  jerseyNumber: string;
  position: string;
  ppg: number;
  rpg: number;
  apg: number;
  tid: number;
  teamSlug: string;
  team: string;
  teamAbbr: string;
  teamCity: string;
  teamName: string;
  draftYear: number;
  draftRound: number;
  draftNumber: number;
  school: string;
  country: string;
  rosterActive: boolean;
  allStar: boolean;
  info: PlayerInfo;
  stats: SeasonStats;
  cmsBio: string;
  shortName: string;
  newsUrl: string;
  rotowireBio: string;
  latestGames: GameLog[];
  awards: Award[];
  latestVideos: Video[];
  rotowireLatestNews: RotowireNews[];
  teamRoster: TeamRosterEntry[];
}

export interface PlayerApiResponse {
  results: PlayerDetail;
}

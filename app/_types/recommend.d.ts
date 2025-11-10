/**
 * 주거 유형
 */
export type HousingType = "원룸" | "투룸" | "쓰리룸" | "아파트";

/**
 * 임대 유형
 */
export type LeaseType = "전세" | "월세";

/**
 * 추천 API 요청 타입
 */
export interface RecommendRequest {
  /** 주거 유형 */
  housing_type: HousingType;
  /** 임대 유형 */
  lease_type: LeaseType;
  /** 최소 보증금 (만원) */
  deposit_min: number;
  /** 최대 보증금 (만원) */
  deposit_max: number;
  /** 최소 월세 (만원) */
  monthly_min: number;
  /** 최대 월세 (만원) */
  monthly_max: number;
  /** 최소 면적 (㎡) */
  area_min: number;
  /** 최대 면적 (㎡) */
  area_max: number;
}

/**
 * 추천 지역 정보
 */
export interface DistrictRecommendation {
  /** 구 이름 */
  district: string;
  /** 설명 */
  description: string;
  /** 지하철역 목록 */
  subwaystations: string[];
  /** 지하철 노선 목록 */
  subwaylines: string[];
}

/**
 * 추천 API 응답 타입
 */
export type RecommendResponse = DistrictRecommendation[];

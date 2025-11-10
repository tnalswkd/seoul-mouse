import type {
  RecommendRequest,
  RecommendResponse,
  HousingType,
  LeaseType,
} from "@/app/_types/recommend";

const API_BASE_URL = "https://api.seoulmouse.site";

/**
 * 프론트엔드 주거 타입을 API 타입으로 변환
 */
function mapHousingType(frontendType: string): HousingType {
  const mapping: Record<string, HousingType> = {
    apartment: "아파트",
    office: "아파트", // 오피스텔은 API에 없어서 아파트로 매핑
    oneroom: "원룸",
    tworoom: "투룸",
  };
  return mapping[frontendType] || "원룸";
}

function mapContractType(frontendType: string): LeaseType {
  const mapping: Record<string, LeaseType> = {
    jeonse: "전세",
    wolse: "월세",
  };
  return mapping[frontendType] || "월세";
}

export interface GetRecommendationsParams {
  housingType: string;
  contractType: string;
  depositMin: number;
  depositMax: number;
  monthlyMin: number;
  monthlyMax: number;
  areaMin: number;
  areaMax: number;
}

/**
 * 주거 추천 API 호출
 */
export async function getRecommendations(
  params: GetRecommendationsParams
): Promise<RecommendResponse> {
  const requestBody: RecommendRequest = {
    housing_type: mapHousingType(params.housingType),
    lease_type: mapContractType(params.contractType),
    deposit_min: params.depositMin,
    deposit_max: params.depositMax,
    monthly_min: params.monthlyMin,
    monthly_max: params.monthlyMax,
    area_min: params.areaMin,
    area_max: params.areaMax,
  };

  const response = await fetch(`${API_BASE_URL}/recommend`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    throw new Error(`API 요청 실패: ${response.status} ${response.statusText}`);
  }

  const data: RecommendResponse = await response.json();
  return data;
}

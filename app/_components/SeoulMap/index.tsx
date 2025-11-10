"use client";

import styled from "styled-components";
import Image from "next/image";
import mapDefault from "@/app/_assets/illust/map_default.png";

import gangnam from "@/app/_assets/illust/map/gangnam.png";
import gangdong from "@/app/_assets/illust/map/gangdong.png";
import gangbuk from "@/app/_assets/illust/map/gangbuk.png";
import gangseo from "@/app/_assets/illust/map/gangseo.png";
import gwanak from "@/app/_assets/illust/map/gwanak.png";
import gwangjin from "@/app/_assets/illust/map/gwangjin.png";
import guro from "@/app/_assets/illust/map/guro.png";
import geumcheon from "@/app/_assets/illust/map/geumcheon.png";
import nowon from "@/app/_assets/illust/map/nowon.png";
import dobong from "@/app/_assets/illust/map/dobong.png";
import dongdaemun from "@/app/_assets/illust/map/dongdaemun.png";
import dongjak from "@/app/_assets/illust/map/dongjak.png";
import mapo from "@/app/_assets/illust/map/mapo.png";
import seodaemun from "@/app/_assets/illust/map/seodaemun.png";
import seocho from "@/app/_assets/illust/map/seocho.png";
import seongdong from "@/app/_assets/illust/map/seongdong.png";
import songpa from "@/app/_assets/illust/map/songpa.png";
import yangcheon from "@/app/_assets/illust/map/yangcheon.png";
import yeongdeungpo from "@/app/_assets/illust/map/yeongdeungpo.png";
import yongsan from "@/app/_assets/illust/map/yongsan.png";
import eunpyeong from "@/app/_assets/illust/map/eunpyeong.png";
import jongno from "@/app/_assets/illust/map/jongno.png";
import jung from "@/app/_assets/illust/map/jung.png";
import jungnang from "@/app/_assets/illust/map/jungnang.png";

type SeoulMapProps = {
  highlightedDistricts?: string[];
};

const DISTRICT_IMAGES: Record<string, any> = {
  gangnam,
  gangdong,
  gangbuk,
  gangseo,
  gwanak,
  gwangjin,
  guro,
  geumcheon,
  nowon,
  dobong,
  dongdaemun,
  dongjak,
  mapo,
  seodaemun,
  seocho,
  seongdong,
  songpa,
  yangcheon,
  yeongdeungpo,
  yongsan,
  eunpyeong,
  jongno,
  jung,
  jungnang,
};

/**
 * 서울 지도 컴포넌트 - 이미지 기반
 * @param highlightedDistricts - 강조할 구 ID 배열
 */
export function SeoulMap({ highlightedDistricts = [] }: SeoulMapProps) {
  return (
    <S.Container>
      <S.MapWrapper>
        <S.BaseMap>
          <Image
            src={mapDefault}
            alt="서울지도"
            fill
            style={{ objectFit: "contain" }}
            priority
          />
        </S.BaseMap>

        {highlightedDistricts.map((districtId) => {
          const districtImage = DISTRICT_IMAGES[districtId];

          if (!districtImage) {
            console.warn(`District image not found: ${districtId}`);
            return null;
          }

          return (
            <S.OverlayMap key={districtId}>
              <Image
                src={districtImage}
                alt={`${districtId} 강조`}
                fill
                style={{ objectFit: "contain" }}
              />
            </S.OverlayMap>
          );
        })}
      </S.MapWrapper>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background: linear-gradient(to bottom, #f8f9fa, #ffffff);
  `,

  MapWrapper: styled.div`
    position: relative;
    width: 100%;
    max-width: 340px;
    aspect-ratio: 1;
  `,

  BaseMap: styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  `,

  OverlayMap: styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  `,
};

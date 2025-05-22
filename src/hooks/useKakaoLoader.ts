// src/hooks/useKakaoLoader.ts
import { useEffect } from "react";

export const useKakaoLoader = () => {
  useEffect(() => {
    const KAKAO_MAP_KEY = import.meta.env.VITE_KAKAO_MAP_KEY;

    if (window.kakao && window.kakao.maps) return;

    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_KEY}&autoload=false&libraries=services`;
    script.async = true;

    script.onload = () => {
      // @ts-expect-error: kakao는 글로벌 객체로 주어짐
      window.kakao.maps.load(() => {
        // SDK 로드 완료 시 실행
      });
    };

    document.head.appendChild(script);
  }, []);
};

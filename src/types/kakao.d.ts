// src/types/kakao.d.ts

export {};

declare global {
  interface Window {
    kakao: typeof kakao;
  }

  const kakao: {
    maps: {
      load: (callback: () => void) => void;
      services: {
        Places: new () => {
          keywordSearch: (
            keyword: string,
            callback: (
              data: {
                address_name: string;
                place_name: string;
                x: string;
                y: string;
              }[],
              status: string
            ) => void
          ) => void;
        };
        Status: {
          OK: string;
        };
      };
    };
  };
}

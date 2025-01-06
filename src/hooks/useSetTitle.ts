import { useEffect } from "react";

const useSetTitle = (title: string): void => {
  useEffect(() => {
    if (title) {
      document.title = title;
    }
  }, [title]);
};

export default useSetTitle;

import { useEffect } from "react";

const BASE = "HomeBrew";

// Every route used to share one title, so a screen reader announced nothing on
// navigation and browser history entries were indistinguishable.
const useDocumentTitle = (title) => {
  useEffect(() => {
    document.title = title ? `${title} · ${BASE}` : BASE;
  }, [title]);
};

export default useDocumentTitle;

import { useTranslation } from "react-i18next";
import { Link, useRouteError } from "react-router-dom";
import s from "./notFoundPage.module.css";

const ErrorPage = () => {
  const { t } = useTranslation();
  // const error = useRouteError();
  // console.error(error);

  return (
    <div id="error-page" className={s.notFoundPageWrapper}>
      <h1>{ t("404page_text_0") }</h1>
      <p>{ t("404page_text_1") }</p>
      <div className={s.link_div}>
        <Link to='/' className={s.link}>
          { t("404page_text_2") }
        </Link>
      </div>
      <p>
        {/* <i>{error.statusText || error.message}</i> */}
      </p>
    </div>
  );
}

export default ErrorPage;
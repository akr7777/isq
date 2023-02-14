import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import s from './footer.module.css';

const Footer = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return <div className={s.footer}>
        <h2>{t('footer_text')}</h2>
        <button onClick={
            () => navigate("q/9c492f3b-4f45-44fb-9c9b-9d42bfc1a961/1")
        }>go to questionarie</button>
    </div>
}

export default Footer;
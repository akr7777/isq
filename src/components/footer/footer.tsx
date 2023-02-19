import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import s from './footer.module.css';

const Footer = () => {
    const { t } = useTranslation();

    return <div className={s.footer}>
        <h2>{t('footer_text')}</h2>
    </div>
}

export default Footer;
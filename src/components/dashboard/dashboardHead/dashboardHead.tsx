import s from './../dashboard.module.css';
import NewSuplier from './newSuplier';
import SearchField from './search/searchField';

const ProfileHead = () => {
    return <div className={s.dashboardHeadStyles}>
        <SearchField />
        <NewSuplier />
    </div>

}

export default ProfileHead;
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Outlet from './components/outlet/outlet';
import { RootState, useAppDispatch } from './store/store';
import { DARK, LIGHT, ThemesOptions } from './hooks/useTheme';
import {  localStorageAccessTokenVariable, localStorageAppThemeVariable, localStorageLanguageVariable, loginAC, RU_LANG } from './store/features/authSlice';
import indexCss from './App.module.css';
import { getProfileThunk } from './store/features/authThunks';
import { Suspense } from 'react';
import Preloader from './components/common/preloader/preloader';
import preloaderStyles from './components/common/preloader/preloader.module.css';

function App() {
  const dispatch = useAppDispatch();

  // Intializing App ->

  // if user logged in
  const accessToken = localStorage.getItem(localStorageAccessTokenVariable);
  if (accessToken && accessToken.length > 0) {
    dispatch(loginAC(accessToken));
    dispatch(getProfileThunk());
  }

  // App theme init
  // const theme = localStorage.getItem(localStorageAppThemeVariable);
  // const theme:ThemesOptions = useSelector((state:RootState) => state.auth.userSettings.theme);
  // if (theme === DARK || theme === LIGHT) {
    // dispatch(changeThemeAC(theme));
  // }

  // language representation
  // const localStorageLang = localStorage.getItem(localStorageLanguageVariable);
  // if (localStorageLang === RU_LANG) {
    //нет AC для замены, но и не нужно вроде
  // }

  // suppliers representation TABLE or BRICK
  // const currentTableBrickView = localStorage.getItem(localStorageSuppliersViewVariable);
  // if (currentTableBrickView === TABLE_VIEW || currentTableBrickView === BRICK_VIEW) {
  //   dispatch(changeViewAC(currentTableBrickView)) 
  // }
  // if () {
  //   dispatch(changeViewAC(BRICK_VIEW))
  // }
    
  // riskView representation: WORD or STAR
  // const riskViewInSuppliersTableOrBrick = localStorage.getItem(localStorageRiskViewVariable);
  // if (riskViewInSuppliersTableOrBrick === RiskViewWORD || riskViewInSuppliersTableOrBrick === RiskViewSTAR) {
  //   dispatch(changeRiskInLineAC(riskViewInSuppliersTableOrBrick));
  // }


  // prefered page size
  // const preferedPageSize = localStorage.getItem(localStoragePageSizingVariable);
  // if (pageSizeOptions.some( s => s === Number(preferedPageSize))) {
  //   dispatch(changePageSizingAC(Number(preferedPageSize)));
  // }

  // user Date prefered type: US (2000-12-31) or RU (31.12.2000)
  // const preferedDateFormat = localStorage.getItem(localStorageUserDateFormat);
  // if (preferedDateFormat === DATE_US || preferedDateFormat === DATE_EU) {
  //   dispatch(userDateFormatChangeAC(preferedDateFormat));
  // }


  // <- Intializing App

  return (
    <Suspense fallback={
      <div className={preloaderStyles.initPreloaderDiv}>
        <Preloader/>
      </div>
    }>
      <div className={indexCss.wrap}>
        <Header />
        <Outlet />
        <Footer />
      </div>
    </Suspense>
  );
}

export default App;

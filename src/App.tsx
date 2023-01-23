import Header from './components/header/header';
import Footer from './components/footer/footer';
import Outlet from './components/outlet/outlet';
import { useAppDispatch } from './store/store';
import { DARK, LIGHT } from './hooks/useTheme';
import { changeThemeAC, localStorageAppThemeVariable, localStorageLanguageVariable, RU_LANG } from './store/features/authSlice';
import indexCss from './App.module.css';
import { BRICK_VIEW, changePageSizingAC, changeRiskInLineAC, changeViewAC, DATE_EU, DATE_US, localStoragePageSizingVariable, localStorageRiskViewVariable, localStorageSuppliersViewVariable, localStorageUserDateFormat, pageSizeOptions, RiskViewSTAR, RiskViewWORD, TABLE_VIEW, userDateFormatChangeAC } from './store/features/supplierSlice';
function App() {

  // Intializing App ->

  // App theme init
  const dispatch = useAppDispatch();
  const theme = localStorage.getItem(localStorageAppThemeVariable);
  if (theme === DARK || theme === LIGHT) {
    dispatch(changeThemeAC(theme));
  }

  // language representation
  const localStorageLang = localStorage.getItem(localStorageLanguageVariable);
  if (localStorageLang === RU_LANG) {
    //нет AC для замены, но и не нужно вроде
  }

  // suppliers representation TABLE or BRICK
  const currentTableBrickView = localStorage.getItem(localStorageSuppliersViewVariable);
  if (currentTableBrickView === TABLE_VIEW || currentTableBrickView === BRICK_VIEW) {
    dispatch(changeViewAC(currentTableBrickView)) 
  }
  // if () {
  //   dispatch(changeViewAC(BRICK_VIEW))
  // }
    
  // riskView representation: WORD or STAR
  const riskViewInSuppliersTableOrBrick = localStorage.getItem(localStorageRiskViewVariable);
  if (riskViewInSuppliersTableOrBrick === RiskViewWORD || riskViewInSuppliersTableOrBrick === RiskViewSTAR) {
    dispatch(changeRiskInLineAC(riskViewInSuppliersTableOrBrick));
  }


  // prefered page size
  const preferedPageSize = localStorage.getItem(localStoragePageSizingVariable);
  if (pageSizeOptions.some( s => s === Number(preferedPageSize))) {
    dispatch(changePageSizingAC(Number(preferedPageSize)));
  }

  // user Date prefered type: US (2000-12-31) or RU (31.12.2000)
  const preferedDateFormat = localStorage.getItem(localStorageUserDateFormat);
  if (preferedDateFormat === DATE_US || preferedDateFormat === DATE_EU) {
    dispatch(userDateFormatChangeAC(preferedDateFormat));
  }


  // <- Intializing App

  return (
    <div className={indexCss.wrap}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;

import Header from './components/header/header';
import Footer from './components/footer/footer';
import Outlet from './components/outlet/outlet';
import { useAppDispatch } from './store/store';
import { DARK, LIGHT } from './hooks/useTheme';
import { changeThemeAC } from './store/features/authSlice';
import indexCss from './App.module.css';
function App() {

  // Intializing App ->
  const dispatch = useAppDispatch();
  const theme = localStorage.getItem('app-theme');
  if (theme === DARK || theme === LIGHT) {
    dispatch(changeThemeAC(theme));
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

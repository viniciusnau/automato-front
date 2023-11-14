import { useEffect, useRef, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import A11y from "./Components/A11y/A11y";
import Header from "./Components/Header/Header";
import Login from "./Pages/Login/Login";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import { ProtectedRoute } from "./Auth/ProtectedRoute";
import Transcriptions from "./Pages/Transcriptions/Transcriptions";
import Visualization from "./Pages/Visualization/Visualization";
import Transcribe from "./Pages/Transcribe/Transcribe";
import Callback from "./Pages/Callback/Callback";
import NotFound from "./Pages/NotFound/NotFound";

function App() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const [colorInverted, setColorInverted] = useState(false);
  const [fontSize, setFontSize] = useState(1);
  const [grayscale, setGrayscale] = useState(false);
  const [customCursor, setCustomCursor] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isOpenModal, setIsOpenModal] = useState<Boolean>(true);
  const [isResponsive, setIsResponsive] = useState<string>("");
  const handleMouseMove = (e: any) => {
    const { clientX, clientY } = e;
    setMousePosition({ x: clientX, y: clientY });
  };

  const handleMouseEnter = () => {
    if (cursorRef.current) {
      const cursorStyle = cursorRef.current.style;
      cursorStyle.top = mousePosition.y + "px";
      cursorStyle.left = mousePosition.x + "px";
      setTimeout(() => {
        cursorStyle.display = "block";
      }, 1);
    }
  };

  const handleMouseLeave = () => {
    if (cursorRef.current) {
      cursorRef.current.style.display = "none";
    }
  };

  const handleOutsideClick = () => {
    setIsOpenModal(true);
  };

  const appStyles = {
    background: colorInverted
      ? `linear-gradient(${isResponsive}, rgba(0, 0, 0, 0.1516981792717087) 0%, rgba(0, 0, 0, 1) 17.5%, rgba(0, 0, 0, 0.14609593837535018) 100%)`
      : `linear-gradient(${isResponsive}, rgba(204, 34, 41, 0.1516981792717087) 0%, rgba(255, 255, 255, 1) 17.5%, rgba(159, 197, 77, 0.14609593837535018) 100%)`,
  };

  useEffect(() => {
    const handleResize = () => {
      setIsResponsive(window.innerWidth < 1800 ? "270deg" : "0deg");
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={`App ${colorInverted ? "invert-colors" : ""} ${
        grayscale ? "grayscale" : ""
      }`}
      style={
        {
          fontSize: `${fontSize}rem`,
          "--font-size": `${fontSize}rem`,
          cursor: `${customCursor ? "none" : "auto"}`,
          "--cursor-pointer": `${customCursor ? "none" : "pointer"}`,
          "--cursor-not-allowed": `${customCursor ? "none" : "not-allowed"}`,
          "--cursor-default": `${customCursor ? "none" : "default"}`,
          "--cursor-text": `${customCursor ? "none" : "text"}`,
          ...appStyles,
        } as any
      }
      onMouseEnter={customCursor ? handleMouseEnter : undefined}
      onMouseLeave={customCursor ? handleMouseLeave : undefined}
      onMouseMove={customCursor ? handleMouseMove : undefined}
      onClick={handleOutsideClick}
    >
      <div
        ref={cursorRef}
        className={`${customCursor ? "cursor" : ""}`}
        style={{
          top: customCursor ? mousePosition.y + "px" : "auto",
          left: customCursor ? mousePosition.x + "px" : "auto",
        }}
      />
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route
              path="/automato/"
              element={
                <ProtectedRoute Component={Transcriptions} path="/automato/" />
              }
            />
            <Route path="/automato/login/" element={<Login />} />
            <Route
              path="/automato/alterar-senha/"
              element={<ResetPassword />}
            />
            <Route
              path="/automato/transcrever/"
              element={
                <ProtectedRoute
                  Component={Transcribe}
                  path="/automato/transcrever/"
                />
              }
            />
            <Route
              path="/automato/visualizacao/"
              element={
                <ProtectedRoute
                  Component={Visualization}
                  path="/automato/visualizacao/"
                />
              }
            />
            <Route
              path="/automato/visualizacao/:id/"
              element={
                <ProtectedRoute
                  Component={Visualization}
                  path="/automato/visualizacao/:id"
                />
              }
            />
            <Route path="/automato/callback/:apiToken" element={<Callback />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <A11y
          setColorInverted={setColorInverted}
          colorInverted={colorInverted}
          setFontSize={setFontSize}
          setGrayscale={setGrayscale}
          grayscale={grayscale}
          setCustomCursor={setCustomCursor}
          mousePosition={mousePosition}
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
        />
      </BrowserRouter>
    </div>
  );
}

export default App;

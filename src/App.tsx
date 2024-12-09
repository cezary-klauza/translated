import TranslateCard from "./components/TranslateCard";
import Background from "./components/Background";

function App() {
  return (
    <>
      <Background />
      <div className="flex flex-col items-center mt-16">
        <img src="/logo.svg" alt="logo" width="150" height="49.27" />
        <main className="flex flex-col lg:flex-row justify-between gap-6 w-full max-w-7xl mt-12 px-2 min-[480px]:px-4 md:px-12">
          <TranslateCard />
          <TranslateCard translation />
        </main>
      </div>
    </>
  );
}

export default App;

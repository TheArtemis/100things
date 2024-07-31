import './App.css';
import './styles/card-container.css'
import Cards from './components/Cards';
import Title from './components/Title';

const things = [
        "Your beautiful Blue eyes.",
        "The 'ihhh' noises that you make when you are happy.",
        "How grumpyly cute you are in the mornings.",
        "How hardworking you are when you go Project Mode",
        "How competitive you are whenever we play cards (or any game really)."
    ]
const startDate = new Date("2024-07-31");

function App() {
    return (
    <div>
        <Title name="Sonja"/>
        <Cards startDate={startDate} things={things}/>    
    </div>
  );
}

export default App;
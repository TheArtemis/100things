import './App.css';
import './styles/card-container.css'
import Cards from './components/Cards';
import Title from './components/Title';

const things = [
        "Sessanta cose mi fanno sparire delle altrre",
        "Non ti piuassasse le robe dell nostre nisse altro",
        "Cosa mi paice nel asdkajdh delle shajsds",
        "dskfjhdskjfhs",
        "nulla nelle nalle sulle"
    ]
const startDate = new Date("2024-07-28");

function App() {
    return (
    <div>
        <Title name="Lorenzo"/>
        <Cards startDate={startDate} things={things}/>    
    </div>
  );
}

export default App;
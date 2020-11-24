const Rules = (props) => {
  return (
    <div>
      <p style={{ fontWeight: "bold", fontSize: "20px" }}>
        Dobrodosli u Mastermind
      </p>
      <p>Mastermind je popularna igra pogadjanja kombinacija.</p>
      <p>Cilj igre je pogoditi zadatu kombinaciju od cetiri znaka sto pre.</p>
      <p>
        Imate 6 pokusaja da pogodite kombinaciju, a nakon svakog pokusaja
        racunar pokazuje koliko ste znakova pogodili koji se nalaze na pravom
        mestu (crvena boja), odnosno koliko znakova ste pogodili, a koji se ne
        nalaze na pravoj poziciji (zuta boja).
      </p>
      <p style={{ fontWeight: "bold" }}>Pravila igre "3 min challenge"</p>
      <p>
        Igra pocinje pritiskom na dugme START, kada tajmer pocinje da odbrojava
        3 minuta.
      </p>
      <p>
        Za svaku odigranu pojedinacnu igru dobijate odgovarajuci broj poena, a
        potom pritiskom na dugme NEXT prelazite na narednu. Poeni se sabiraju, a
        konacan rezultat mozete upisati na nasu tabelu nakon isteka 3 minuta.
      </p>
      <p>
        Mastermind je igra srece, ali i logike. Saznajte koliko ste dobar
        logicar i uporedite se sa svojim prijateljima!
      </p>
      <p>Bodovanje:</p>
      <ul>
        <li>Pogodak u 1. redu - 60 poena</li>
        <li>Pogodak u 2. redu - 50 poena</li>
        <li>Pogodak u 3. redu - 40 poena</li>
        <li>Pogodak u 4. redu - 30 poena</li>
        <li>Pogodak u 5. redu - 20 poena</li>
        <li>Pogodak u 6. redu - 10 poena</li>
        <li>Niste pogodili - minus 10 poena</li>
      </ul>
    </div>
  );
};

export default Rules;

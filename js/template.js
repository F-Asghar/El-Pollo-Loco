export function getControlTemplate() {
    return `<div id="close-container">
            <button
            onclick="closeDialog('controls-dialog')"
            id="close-dialog">
            <p>X</p>
            </button>
            </div>
            <h2 id="headline">Control Settings</h2>
            <h3>Move Left: Arrow Left</h3>
            <h3>Move Right: Arrow Right</h3>
            <h3>Jump: Space</h3>
            <h3>Throw Bottle: D</h3> `;
}

export function getRestartTemplate() {
    return `<div>
                <img
                    id="restart-button"
                    class="home-buttons"
                    onclick="start()"
                    src="./img/start-screen/restart.png"
                    alt=""
                />
                <h4>Restart</h4>
                </div>
                <div>
                <img
                    id="home"
                    class="home-buttons"
                    onclick="home()"
                    src="./img/start-screen/home.png"
                    alt=""
                />
                <h4>Home</h4>
            </div>`;
}

export function getImprintTemplate() {
    return `<div id="close-container">
            <button
            onclick="closeDialog('information-dialog')"
            id="close-dialog">
            <p>X</p>
            </button>
            </div> 
            <section id="imprint-template">
            <h2>Impressum</h2>
            <p>
                Dies ist eine nicht-kommerzielle, rein private
                Website, die ausschließlich zu Schulungs- und
                Übungszwecken erstellt wurde.
                <h2>Verantwortlich gemäß § 5 TMG</h2>
            <p>
                Fiarazz Asghar<br />
                Auf der Steige 15<br />
                71287 Weissach
                <h2>Kontakt</h2>
            <p>
                E-Mail:
                <a href="mailto:ferazasghar6@gmail.com">
                ferazasghar6@gmail.com</a>
            </p>
            <p>
                Quelle:
                <a href="https://www.e-recht24.de">
                https://www.e-recht24.de</a>
            </p>
            </section>`;
}

export function getPrivacyPolicyTemplate() {
    return `<section>
    <h2>Datenschutzerklärung</h2>

    <h3>1. Verantwortliche Stelle</h3>
    <p>
        Fiarazz Asghar<br>
        Auf der Steige 15<br>
        71287 Weissach<br>
        E-Mail: 
        <a href="mailto:ferazasghar6@gmail.com">ferazasghar6@gmail.com</a>
    </p>
    <p>
        Diese Website ist eine nicht-kommerzielle, rein private Webseite,
        die ausschließlich zu Schulungs- und Übungszwecken erstellt wurde.
    </p>

    <h3>2. Erhebung und Speicherung personenbezogener Daten sowie Art und Zweck ihrer Verwendung</h3>
    <h4>a) Beim Besuch der Website</h4>
    <p>
        Der Betreiber dieser privaten Website speichert keine personenbezogenen Daten aktiv.
        Es findet kein Tracking, keine Analyse und keine Weitergabe von Daten an Dritte statt.
    </p>
    <p>
        Der Webhoster kann jedoch technisch notwendige Daten automatisch erheben 
        (z. B. IP-Adresse, Datum, Uhrzeit, Browsertyp). Dies ist aus technischen Gründen 
        erforderlich, um die Website bereitzustellen. Eine weitergehende Auswertung erfolgt nicht.
    </p>

    <h3>3. Cookies</h3>
    <p>
        Auf dieser Website werden keine Cookies gesetzt, die personenbezogene Daten speichern 
        oder analysieren.
    </p>

    <h3>4. Kontaktaufnahme</h3>
    <p>
        Wenn du über die angegebene E-Mail-Adresse Kontakt aufnimmst, speichere ich die
        übermittelten Daten (z. B. E-Mail-Adresse, Name, Inhalt der Nachricht) ausschließlich 
        zur Bearbeitung deiner Anfrage. Die Daten werden nicht an Dritte weitergegeben.
    </p>

    <h3>5. Rechte der betroffenen Personen</h3>
    <p>
        Dir stehen folgende Rechte nach der DSGVO zu:
    </p>
    <ul>
        <li>Auskunft über gespeicherte personenbezogene Daten</li>
        <li>Berichtigung unrichtiger Daten</li>
        <li>Löschung („Recht auf Vergessenwerden“)</li>
        <li>Einschränkung der Verarbeitung</li>
        <li>Widerspruch gegen die Verarbeitung</li>
        <li>Datenübertragbarkeit</li>
    </ul>
    <p>
        Zur Ausübung dieser Rechte reicht eine formlose E-Mail an 
        <a href="mailto:ferazasghar6@gmail.com">ferazasghar6@gmail.com</a>.
    </p>

    <h3>6. Speicherung der Daten</h3>
    <p>
        Es werden keine personenbezogenen Daten dauerhaft gespeichert, außer wenn du mir freiwillig 
        welche per E-Mail sendest. Diese Daten werden gelöscht, sobald dein Anliegen erledigt ist.
    </p>

    <h3>7. Weitergabe von Daten an Dritte</h3>
    <p>
        Es erfolgt keine Weitergabe personenbezogener Daten an Dritte.
    </p>

    <h3>8. Änderungen dieser Datenschutzerklärung</h3>
    <p>
        Ich behalte mir vor, diese Datenschutzerklärung bei Bedarf anzupassen, um sie an 
        aktuelle rechtliche Anforderungen oder Änderungen auf der Website anzupassen.
    </p>
</section>
`;
}

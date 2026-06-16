export function getControlTemplate() {
    return `<div id="close-container">
            <button
            onclick="closeDialog('controls-dialog')"
            id="close-dialog">
            <p>X</p>
            </button>
            </div>
            <h2 id="controls-headline">Control Settings</h2>
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
                    onclick="startGame()"
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

export function getLegalTemplate() {
    return `<div id="close-container">
            <button
            onclick="closeDialog('information-dialog')"
            id="close-dialog">
            <p>X</p>
            </button>
            </div> 
            <section id="imprint-template">
            <h2>Legal Notice</h2>
            <p>
                This is a non-commercial, purely private
                website created exclusively for training and
                educational purposes.
                <h3>Responsible according to § 5 TMG</h3>
            <p>
                Fiarazz Asghar<br />
                Auf der Steige 15<br />
                71287 Weissach
                <h2>Contact</h2>
            <p>
                Email:
                <a href="mailto:ferazasghar6@gmail.com">
                ferazasghar6@gmail.com</a>
            </p>
            <p>
                Source:
                <a href="https://www.e-recht24.de">
                https://www.e-recht24.de</a>
            </p>
            </section>`;
}

export function getPrivacyPolicyTemplate() {
    return `<section>
    <h2>Privacy Policy</h2>

    <h3>1. Responsible Entity</h3>
    <p>
        Fiarazz Asghar<br>
        Auf der Steige 15<br>
        71287 Weissach<br>
        Email: 
        <a href="mailto:ferazasghar6@gmail.com">ferazasghar6@gmail.com</a>
    </p>
    <p>
        This website is a non-commercial, purely private website
        created exclusively for training and educational purposes.
    </p>

    <h3>2. Collection and Storage of Personal Data as well as the Type and Purpose of Their Use</h3>
    <h3>a) When Visiting the Website</h3>
    <p>
        The operator of this private website does not actively store any personal data.
        There is no tracking, no analysis, and no disclosure of data to third parties.
    </p>
    <p>
        However, the web host may automatically collect technically necessary data 
        (e.g., IP address, date, time, browser type). This is required for technical reasons 
        to provide the website. No further evaluation takes place.
    </p>

    <h3>3. Cookies</h3>
    <p>
        No cookies that store or analyze personal data are set on this website.
    </p>

    <h3>4. Contacting Us</h3>
    <p>
        If you contact us via the provided email address, I will store the
        transmitted data (e.g., email address, name, content of the message) exclusively 
        to process your inquiry. The data will not be shared with third parties.
    </p>

    <h3>5. Rights of the Data Subjects</h3>
    <p>
        You are entitled to the following rights under the GDPR:
    </p>
    <ul>
        <li>Information about stored personal data</li>
        <li>Correction of incorrect data</li>
        <li>Deletion ("Right to be forgotten")</li>
        <li>Restriction of processing</li>
        <li>Objection to processing</li>
        <li>Data portability</li>
    </ul>
    <p>
        To exercise these rights, an informal email to 
        <a href="mailto:ferazasghar6@gmail.com">ferazasghar6@gmail.com</a> is sufficient.
    </p>

    <h3>6. Data Retention</h3>
    <p>
        No personal data is permanently stored unless you voluntarily send it to me 
        via email. This data will be deleted as soon as your request has been resolved.
    </p>

    <h3>7. Disclosure of Data to Third Parties</h3>
    <p>
        There is no disclosure of personal data to third parties.
    </p>

    <h3>8. Changes to This Privacy Policy</h3>
    <p>
        I reserve the right to adapt this privacy policy if necessary to align it with 
        current legal requirements or changes on the website.
    </p>
</section>
`;
}

import './Principal.css';
import { Navbar } from '../../Components/Navbar/Navbar.jsx';
 
const Principal = () => {
    return (
        <>
            <Navbar />
            <header className="hero">
                <div className="hero-content">
                    <h1 className="hero-title animate__animated animate__fadeInDown">Innovabank</h1>
                    <p className="hero-slogan animate__animated animate__fadeInUp">Innovando tu futuro financiero</p>
                    <a href="#services" className="hero-button animate__animated animate__fadeInUp">Conoce más</a>
                </div>
            </header>
 
            <section id="about" className="about">
                <h2 className="section-title animate__animated animate__fadeInUp">Sobre Nosotros</h2>
                <div className="about-content animate__animated animate__fadeInUp">
                    <p>
                        En Innovabank, nos dedicamos a proporcionar soluciones financieras innovadoras que se adapten a tus necesidades.
                        Nuestra misión es ser el banco más confiable y eficiente, comprometido con el éxito de nuestros clientes y comunidades.
                    </p>
                </div>
            </section>
 
            <section id="services" className="services">
                <h2 className="section-title animate__animated animate__fadeInUp">Nuestros Servicios</h2>
                <div className="services-container">
                    <div className="service-card animate__animated animate__fadeInLeft">
                        <h3 className="service-title">Cuentas de Ahorro</h3>
                        <p className="service-description">Soluciones de ahorro a tu medida con los mejores intereses.</p>
                    </div>
                    <div className="service-card animate__animated animate__fadeInLeft">
                        <h3 className="service-title">Préstamos</h3>
                        <p className="service-description">Financiamiento accesible para tus proyectos personales y empresariales.</p>
                    </div>
                    <div className="service-card animate__animated animate__fadeInRight">
                        <h3 className="service-title">Tarjetas de Crédito</h3>
                        <p className="service-description">Las mejores opciones de tarjetas de crédito para tu estilo de vida.</p>
                    </div>
                </div>
            </section>
 
            <section id="testimonials" className="testimonials">
                <h2 className="section-title animate__animated animate__fadeInUp">Testimonios</h2>
                <div className="testimonials-container">
                    <div className="testimonial-card animate__animated animate__fadeInLeft">
                        <p className="testimonial-text">"Innovabank ha transformado mi forma de manejar mis finanzas. ¡Estoy muy satisfecho con su servicio!"</p>
                        <p className="testimonial-author">- Juan Pérez</p>
                    </div>
                    <div className="testimonial-card animate__animated animate__fadeInLeft">
                        <p className="testimonial-text">"Gracias a Innovabank, pude obtener un préstamo para expandir mi negocio rápidamente y sin complicaciones."</p>
                        <p className="testimonial-author">- María López</p>
                    </div>
                    <div className="testimonial-card animate__animated animate__fadeInRight">
                        <p className="testimonial-text">"Las opciones de inversión que ofrece Innovabank son excelentes. Estoy viendo un gran crecimiento en mis ahorros."</p>
                        <p className="testimonial-author">- Carlos Gómez</p>
                    </div>
                </div>
            </section>
 
            <section id="team" className="team">
                <h2 className="section-title animate__animated animate__fadeInUp">Nuestro Equipo</h2>
                <div className="team-container">
                    <div className="team-member animate__animated animate__fadeInLeft">
                        <img src="/src/assets/Coy.jpg" alt="Edwin Coy" className="team-photo" />
                        <h3 className="team-name">Edwin Coy</h3>
                        <p className="team-role">Scrum Master</p>
                    </div>
                    <div className="team-member animate__animated animate__fadeInLeft">
                        <img src="/src/assets/Llanel.jpg" alt="LLanel Escobar" className="team-photo" />
                        <h3 className="team-name">LLanel Escobar</h3>
                        <p className="team-role">Programador</p>
                    </div>
                    <div className="team-member animate__animated animate__fadeInRight">
                        <img src="/src/assets/Javier.jpg" alt="Javier Vega" className="team-photo" />
                        <h3 className="team-name">Javier Vega</h3>
                        <p className="team-role">Programador</p>
                    </div>
                    <div className="team-member animate__animated animate__fadeInRight">
                        <img src="/src/assets/Brener.jpg" alt="Brener Valladares" className="team-photo" />
                        <h3 className="team-name">Brener Valladares</h3>
                        <p className="team-role">Programador</p>
                    </div>
                    <div className="team-member animate__animated animate__fadeInLeft">
                        <img src="/src/assets/Molina.jpg" alt="Jose Molina" className="team-photo" />
                        <h3 className="team-name">Jose Molina</h3>
                        <p className="team-role">Programador</p>
                    </div>
                    <div className="team-member animate__animated animate__fadeInRight">
                        <img src="/src/assets/Manu.jpg" alt="Manuel Gonzales" className="team-photo" />
                        <h3 className="team-name">Manuel Gonzales</h3>
                        <p className="team-role">Programador</p>
                    </div>
                    <div className="team-member animate__animated animate__fadeInRight">
                        <img src="/src/assets/Omar.jpg" alt="Omar Castillo" className="team-photo" />
                        <h3 className="team-name">Omar Castillo</h3>
                        <p className="team-role">Programador</p>
                    </div>
                </div>
            </section>
 
            <section id="contact" className="contact">
                <h2 className="section-title animate__animated animate__fadeInUp">Contáctanos</h2>
                <div className="contact-content animate__animated animate__fadeInUp">
                    <p>Si tienes alguna pregunta o necesitas asistencia, no dudes en contactarnos.</p>
                    <a href="mailto:info@innovabank.com" className="contact-button">Envíanos un correo</a>
                </div>
            </section>
 
            <footer className="footer">
                <p className="footer-text">© 2024 Innovabank. Todos los derechos reservados.</p>
            </footer>
        </>
    );
};
 
export default Principal;
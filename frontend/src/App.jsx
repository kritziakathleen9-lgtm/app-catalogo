import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import { Search, Menu, X, Clock, ArrowRight, Trash2 } from 'lucide-react';
import { imagenes } from './imagenes';
import {
    obtenerRecetas,
    crearReceta,
    editarReceta,
    eliminarReceta,
    enviarContacto
} from './api';

const demo = [];

function imagenDeReceta(r) {
    const nombre = (r.nombre || '').toLowerCase();
    if (nombre.includes('paella')) return imagenes.paella;
    if (nombre.includes('ceviche')) return imagenes.ceviche;
    if (nombre.includes('lomo')) return imagenes.lomoSaltado;
    if (nombre.includes('tortilla')) return imagenes.tortilla;
    if (nombre.includes('ají') || nombre.includes('aji')) return imagenes.ajiGallina;
    if (nombre.includes('gazpacho')) return imagenes.gazpacho;
    if (nombre.includes('cachopo')) return imagenes.cachopo;
    return imagenes.hero;
}

function normalizar(r) {
    if (Array.isArray(r)) {
        const receta = { id: r[0], nombre: r[1] || 'Receta', pais: r[2] || '', categoria: r[3] || '', ingredientes: r[4] || '', preparacion: r[5] || '', tiempo_minutos: r[6] || 0, imagen_url: r[7] || '' };
        return { ...receta, imagen_url: receta.imagen_url || imagenDeReceta(receta) };
    }
    return { ...r, imagen_url: r.imagen_url || imagenDeReceta(r) };
}

function Header() {
    const [open, setOpen] = useState(false);
    return <header className="header"><div className="wrap nav">
        <Link to="/" className="logo">Entre <em>Sabores</em><small>RECETARIO DIGITAL</small></Link>
        <button className="mobileToggle" onClick={() => setOpen(!open)} aria-label="Abrir menú">{open ? <X /> : <Menu />}</button>
        <nav className={open ? 'open' : ''} onClick={() => setOpen(false)}>
            <Link to="/">Inicio</Link><Link to="/recetas">Recetas</Link><Link to="/nosotros">Nosotros</Link><Link to="/contacto">Contacto</Link><Link to="/nueva" className="btn small">+ Añadir receta</Link>
        </nav>
    </div></header>;
}

function Footer() {
    return <footer><div className="wrap footerGrid">
        <div><h2>Entre Sabores</h2><p>Dos culturas, infinitos sabores. Un recetario para compartir nuestra pasión por la cocina española y peruana.</p></div>
        <div><h3>Explorar</h3><Link to="/recetas">Todas las recetas</Link><Link to="/nueva">Añadir receta</Link><Link to="/nosotros">Sobre nosotros</Link></div>
        <div><h3>Ayuda y legal</h3><Link to="/contacto">Contacto</Link><Link to="/legal">Privacidad y cookies</Link></div>
    </div><div className="wrap copyright">© 2026 Entre Sabores · Proyecto educativo</div></footer>;
}
function Card({ r }) {
    return <Link to={'/recetas/' + r.id} className="recipeCard">
        <img src={r.imagen_url || imagenDeReceta(r)} alt={r.nombre} onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = imagenDeReceta(r); }} />
        <div className="cardBody"><span className="eyebrow">{r.pais || 'Receta'} · {r.categoria || 'Cocina casera'}</span><h3>{r.nombre}</h3><span className="time"><Clock size={15} />{r.tiempo_minutos || '—'} min</span></div>
    </Link>;
}


function Home({ recetas, error, cargando }) {
    return (
        <>
            {/* HERO PANORÁMICO */}
            <section className="hero">
                <div className="wrap heroGrid">
                    <div className="heroContent">
                        <span className="eyebrow">
                            COCINA ESPAÑOLA & PERUANA
                        </span>

                        <h1>
                            Dos culturas,
                            <br />
                            <em>infinitos sabores</em>
                        </h1>

                        <p>
                            Descubre recetas tradicionales, historias y sabores
                            que unen España y Perú en una misma mesa.
                        </p>

                        <Link className="btn" to="/recetas">
                            Explorar recetas
                            <ArrowRight size={17} />
                        </Link>
                    </div>

                    <div className="heroImage">
                        <img
                            src={imagenes.hero}
                            alt="Buffet de cocina española y peruana"
                        />
                    </div>
                </div>
            </section>
            {/* NUESTRAS RAÍCES */}
            <section className="wrap section">
                <div className="sectionHead">
                    <div>
                        <span className="eyebrow">NUESTRAS RAÍCES</span>
                        <h2>Un viaje entre dos cocinas</h2>
                    </div>
                </div>

                <div className="cultureGrid">
                    <Link
                        to="/recetas?pais=España"
                        className="culture"
                        style={{
                            backgroundImage: `linear-gradient(0deg, #1d1a16bd, transparent), url('${imagenes.espana}')`,
                        }}
                    >
                        <h3>Sabores de España 🇪🇸</h3>
                        <span>Descubrir recetas →</span>
                    </Link>

                    <Link
                        to="/recetas?pais=Perú"
                        className="culture"
                        style={{
                            backgroundImage: `linear-gradient(0deg, #1d1a16bd, transparent), url('${imagenes.peru}')`,
                        }}
                    >
                        <h3>Sabores del Perú 🇵🇪</h3>
                        <span>Descubrir recetas →</span>
                    </Link>
                </div>
            </section>

            {/* RECETAS DESTACADAS */}
            <section className="wrap section">
                <div className="sectionHead">
                    <div>
                        <span className="eyebrow">PARA INSPIRARTE</span>
                        <h2>Recetas destacadas</h2>
                    </div>

                    <Link to="/recetas">Ver todas →</Link>
                </div>

                {cargando && (
                    <p className="notice">
                        Cargando recetas desde la API...
                    </p>
                )}

                {error && (
                    <p className="notice" role="alert">
                        No se pudieron cargar las recetas.
                        Por favor, inténtalo más tarde.
                    </p>
                )}

                <div className="cards">
                    {recetas.slice(0, 4).map((r) => (
                        <Card key={r.id} r={r} />
                    ))}
                </div>
            </section>
        </>
    );
}
function Catalogo({ recetas, error, cargando }) {
    const loc = useLocation();
    const q = new URLSearchParams(loc.search);
    const [buscar, setBuscar] = useState('');
    const [pais, setPais] = useState(q.get('pais') || 'Todos');
    useEffect(() => setPais(q.get('pais') || 'Todos'), [loc.search]);
    const filtradas = recetas.filter(r => (pais === 'Todos' || r.pais?.toLowerCase() === pais.toLowerCase()) && (r.nombre || '').toLowerCase().includes(buscar.toLowerCase()));
    return <main className="wrap section"><span className="eyebrow">EXPLORA Y DESCUBRE</span><h1>Catálogo de recetas</h1><p>Encuentra tu próxima receta favorita entre los sabores de España y Perú.</p>
        {cargando && <p className="notice">Cargando recetas desde la API...</p>}
        {error && (
            <p className="notice" role="alert">
                No se pudieron cargar las recetas.
                Por favor, inténtalo más tarde.
            </p>
        )}
        <div className="filters"><label className="search"><Search size={19} /><input placeholder="Buscar recetas..." value={buscar} onChange={e => setBuscar(e.target.value)} /></label><select value={pais} onChange={e => setPais(e.target.value)}><option>Todos</option><option>España</option><option>Perú</option></select></div>
        <div className="cards">{filtradas.map(r => <Card key={r.id} r={r} />)}</div>
        {!cargando && !filtradas.length && <p>No encontramos recetas con esos filtros.</p>}
    </main>;
}

function Detalle({ recetas }) {
    const { id } = useParams();
    const r = recetas.find(x => String(x.id) === id);
    if (!r) return <main className="wrap section"><h1>Receta no encontrada</h1><Link to="/recetas">Volver al catálogo</Link></main>;
    return <main className="wrap section"><Link to="/recetas" className="back">← Volver al catálogo</Link><div className="detail">
        <img src={r.imagen_url || imagenDeReceta(r)} alt={r.nombre} onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = imagenDeReceta(r); }} />
        <div><span className="eyebrow">{r.pais} · {r.categoria}</span><h1>{r.nombre}</h1><p><Clock size={18} /> {r.tiempo_minutos} minutos</p><Link className="btn secondary" to={'/editar/' + r.id}>Editar receta</Link><Link className="btn outline" to={'/eliminar/' + r.id}>Eliminar receta</Link></div>
    </div><div className="detailText"><section><h2>Ingredientes</h2><p className="pre">{r.ingredientes || 'Sin ingredientes registrados'}</p></section><section><h2>Preparación paso a paso</h2><p className="pre">{r.preparacion || 'Sin preparación registrada'}</p></section></div></main>;
}

function Formulario({ recetas, actualizarRecetas, cargando }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const r = recetas.find(x => String(x.id) === id);
    const [form, setForm] = useState({ nombre: '', pais: 'España', categoria: '', tiempo_minutos: '', ingredientes: '', preparacion: '', imagen_url: '' });
    const [guardando, setGuardando] = useState(false);
    const [errorFormulario, setErrorFormulario] = useState('');

    useEffect(() => {
        setForm({
            nombre: r?.nombre || '',
            pais: r?.pais || 'España',
            categoria: r?.categoria || '',
            tiempo_minutos: r?.tiempo_minutos ?? '',
            ingredientes: r?.ingredientes || '',
            preparacion: r?.preparacion || '',
            imagen_url: r && r.imagen_url === imagenDeReceta(r) ? '' : (r?.imagen_url || '')
        });
    }, [id, r?.id, r?.nombre, r?.pais, r?.categoria, r?.tiempo_minutos, r?.ingredientes, r?.preparacion, r?.imagen_url]);

    async function guardar(e) {
        e.preventDefault();
        setErrorFormulario('');
        const minutos = Number(form.tiempo_minutos);
        if (!Number.isInteger(minutos) || minutos <= 0) {
            setErrorFormulario('Introduce un tiempo válido mayor que cero.');
            return;
        }
        if (id && !r) {
            setErrorFormulario('No se encontró la receta que quieres editar.');
            return;
        }
        setGuardando(true);
        try {
            const datos = {
                nombre: form.nombre.trim(),
                pais: form.pais,
                categoria: form.categoria.trim(),
                ingredientes: form.ingredientes.trim(),
                preparacion: form.preparacion.trim(),
                tiempo_minutos: minutos,
                imagen_url: form.imagen_url.trim() || null
            };
            await (id ? editarReceta(id, datos) : crearReceta(datos));
            await actualizarRecetas();
            navigate('/recetas');
        } catch (error) {
            setErrorFormulario(error.message || 'No se pudo guardar la receta.');
        } finally {
            setGuardando(false);
        }
    }

    if (id && cargando) return <main className="wrap section narrow"><p className="notice">Cargando receta...</p></main>;
    return <main className="wrap section narrow"><span className="eyebrow">COMPARTE TU COCINA</span><h1>{id ? 'Editar receta' : 'Añadir nueva receta'}</h1><p>Completa los campos para preparar tu receta.</p>
        <form className="form" onSubmit={guardar}>
            {[['nombre', 'Nombre de la receta'], ['categoria', 'Categoría'], ['tiempo_minutos', 'Tiempo en minutos'], ['imagen_url', 'URL de imagen']].map(([k, t]) => <label key={k}>{t}<input required={k !== 'imagen_url'} min={k === 'tiempo_minutos' ? '1' : undefined} type={k === 'tiempo_minutos' ? 'number' : 'text'} value={form[k]} onChange={e => setForm({ ...form, [k]: e.target.value })} /></label>)}
            <label>País<select value={form.pais} onChange={e => setForm({ ...form, pais: e.target.value })}><option>España</option><option>Perú</option></select></label>
            {[['ingredientes', 'Ingredientes'], ['preparacion', 'Preparación']].map(([k, t]) => <label key={k}>{t}<textarea required rows="5" value={form[k]} onChange={e => setForm({ ...form, [k]: e.target.value })} /></label>)}
            {errorFormulario && <p className="notice" role="alert">{errorFormulario}</p>}
            <button className="btn" type="submit" disabled={guardando}>{guardando ? 'Guardando...' : id ? 'Guardar cambios' : 'Añadir receta'}</button>
        </form>
    </main>;
}
function Eliminar({ recetas, actualizarRecetas, cargando }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const r = recetas.find(x => String(x.id) === id);
    const [eliminando, setEliminando] = useState(false);
    const [errorEliminar, setErrorEliminar] = useState('');

    async function confirmar() {
        if (!r) return;
        setEliminando(true);
        setErrorEliminar('');
        try {
            await eliminarReceta(id);
            await actualizarRecetas();
            navigate('/recetas');
        } catch (error) {
            setErrorEliminar(error.message || 'No se pudo eliminar la receta.');
        } finally {
            setEliminando(false);
        }
    }

    if (cargando) return <main className="wrap section narrow"><p className="notice">Cargando receta...</p></main>;
    return <main className="wrap section narrow"><div className="panel"><Trash2 size={38} color="#a65236" /><h1>¿Estás seguro de que deseas eliminar esta receta?</h1><p>{r?.nombre || 'Receta no encontrada'} · Esta acción no se puede deshacer.</p>
        {errorEliminar && <p className="notice" role="alert">{errorEliminar}</p>}
        <Link className="btn secondary" to={r ? '/recetas/' + id : '/recetas'}>Cancelar y volver</Link>{' '}
        <button className="btn" type="button" onClick={confirmar} disabled={eliminando || !r}>{eliminando ? 'Eliminando...' : 'Sí, eliminar receta'}</button>
    </div></main>;
}

function Nosotros() {
    return <main className="wrap section narrow">
        <span className="eyebrow">NUESTRA HISTORIA</span>
        <h1>Sobre Entre Sabores</h1>
        <h2>Dos culturas, infinitos sabores</h2>
        <p>Entre Sabores es un recetario digital dedicado a compartir la riqueza gastronómica de España y Perú. Queremos que descubrir, preparar y compartir recetas sea sencillo y agradable.</p>
        <h2>Preguntas frecuentes</h2>
        <details><summary>¿Cómo puedo explorar las recetas?</summary><p>Entra en el catálogo y filtra por país o nombre.</p></details>
        <details><summary>¿Puedo añadir mi propia receta?</summary><p>Sí. Puedes añadir recetas desde el formulario y guardarlas en nuestro recetario.</p></details></main>;
}

function Contacto() {
    const [form, setForm] = useState({
        nombre: '',
        correo: '',
        mensaje: ''
    });

    const [enviado, setEnviado] = useState(false);
    const [enviando, setEnviando] = useState(false);
    const [error, setError] = useState('');

    async function enviar(e) {
        e.preventDefault();
        setEnviando(true);
        setError('');
        setEnviado(false);

        try {
            await enviarContacto(form);

            setEnviado(true);
            setForm({
                nombre: '',
                correo: '',
                mensaje: ''
            });
        } catch (error) {
            setError('No se pudo enviar el mensaje. Inténtalo de nuevo.');
        } finally {
            setEnviando(false);
        }
    }

    return (
        <main className="wrap section narrow">
            <span className="eyebrow">
                ESTAMOS AQUÍ PARA AYUDARTE
            </span>

            <h1>Contacto y Ayuda</h1>

            <p>
                ¿Tienes alguna pregunta o sugerencia? Escríbenos.
            </p>

            <form className="form" onSubmit={enviar}>
                <label>
                    Nombre
                    <input
                        required
                        minLength={2}
                        maxLength={100}
                        value={form.nombre}
                        onChange={e =>
                            setForm({ ...form, nombre: e.target.value })
                        }
                    />
                </label>

                <label>
                    Correo electrónico
                    <input
                        required
                        type="email"
                        maxLength={254}
                        value={form.correo}
                        onChange={e =>
                            setForm({ ...form, correo: e.target.value })
                        }
                    />
                </label>

                <label>
                    Mensaje
                    <textarea
                        required
                        rows="6"
                        maxLength={2000}
                        value={form.mensaje}
                        onChange={e =>
                            setForm({ ...form, mensaje: e.target.value })
                        }
                    />
                </label>

                <button
                    className="btn"
                    type="submit"
                    disabled={enviando}
                >
                    {enviando ? 'Enviando...' : 'Enviar mensaje'}
                </button>
            </form>

            {enviado && (
                <div className="contact-success" role="status">
                    <strong>¡Mensaje enviado correctamente!</strong>
                    <p>Gracias por contactar con Entre Sabores.</p>
                </div>
            )}

            {error && (
                <p className="notice" role="alert">{error}</p>
            )}
        </main>
    );
}


function Legal() {
    return (
        <main className="wrap section narrow">
            <span className="eyebrow">
                INFORMACIÓN IMPORTANTE
            </span>

            <h1>Centro Legal y Privacidad</h1>

            <section>
                <h2>Aviso legal</h2>
                <p>
                    Entre Sabores es un proyecto académico desarrollado
                    por Kritzia y Paula con el objetivo de compartir y
                    dar a conocer la riqueza gastronómica de España y Perú.
                </p>
                <p>
                    La plataforma permite consultar, añadir, editar y
                    eliminar recetas mediante un catálogo digital
                    interactivo.
                </p>
                <p>
                    Este sitio web tiene una finalidad educativa,
                    informativa y no comercial.
                </p>
            </section>

            <section>
                <h2>Política de privacidad</h2>
                <p>
                    Entre Sabores recoge los datos facilitados
                    voluntariamente a través del formulario de contacto:
                    nombre, correo electrónico y mensaje.
                </p>
                <p>
                    Estos datos se almacenan en Supabase y se utilizan
                    para gestionar las consultas recibidas y comprobar
                    el funcionamiento del proyecto académico.
                </p>
                <p>
                    Se recomienda no introducir información sensible
                    ni confidencial en el formulario.
                </p>
                <p>
                    Los usuarios pueden solicitar el acceso,
                    la rectificación o la eliminación de sus datos
                    personales a las responsables del proyecto.
                </p>
            </section>

            <section>
                <h2>Política de cookies</h2>
                <p>
                    Entre Sabores es una aplicación web desarrollada
                    con fines educativos.
                </p>
                <p>
                    La plataforma utiliza servicios externos de
                    alojamiento y gestión de datos, como Render
                    y Supabase.
                </p>
                <p>
                    Los usuarios pueden consultar y gestionar las
                    cookies desde la configuración de su navegador.
                </p>
            </section>

            <section>
                <h2>Términos y condiciones</h2>
                <p>
                    El uso de Entre Sabores debe realizarse de forma
                    responsable y respetuosa.
                </p>
                <p>
                    Los usuarios deberán evitar introducir contenido
                    ofensivo, información falsa o datos personales
                    de terceros sin su autorización.
                </p>
                <p>
                    Las recetas publicadas tienen una finalidad
                    informativa y educativa. Los usuarios deberán
                    tener en cuenta sus necesidades alimentarias,
                    alergias e intolerancias.
                </p>
                <p>
                    Al tratarse de un proyecto académico, sus
                    funcionalidades y contenidos pueden modificarse
                    durante su desarrollo.
                </p>
            </section>

        </main>
    );
}

export default function App() {
    const [recetas, setRecetas] = useState([]);
    const [error, setError] = useState(false);
    const [cargando, setCargando] = useState(true);
    async function actualizarRecetas() {
        const data = await obtenerRecetas();
        if (!Array.isArray(data)) throw new Error('Respuesta inesperada de la API');
        setRecetas(data.map(normalizar));
        setError(false);
    }

    useEffect(() => {
        actualizarRecetas()
            .catch(() => setError(true))
            .finally(() => setCargando(false));
    }, []);

    return (
        <>
            <Header />

            <Routes>
                <Route
                    path="/"
                    element={
                        <Home
                            recetas={recetas}
                            error={error}
                            cargando={cargando}
                        />
                    }
                />

                <Route
                    path="/recetas"
                    element={
                        <Catalogo
                            recetas={recetas}
                            error={error}
                            cargando={cargando}
                        />
                    }
                />

                <Route
                    path="/recetas/:id"
                    element={<Detalle recetas={recetas} />}
                />

                <Route
                    path="/nueva"
                    element={<Formulario recetas={recetas} actualizarRecetas={actualizarRecetas} cargando={cargando} />}
                />

                <Route
                    path="/editar/:id"
                    element={<Formulario recetas={recetas} actualizarRecetas={actualizarRecetas} cargando={cargando} />}
                />

                <Route
                    path="/eliminar/:id"
                    element={<Eliminar recetas={recetas} actualizarRecetas={actualizarRecetas} cargando={cargando} />}
                />

                <Route path="/nosotros" element={<Nosotros />} />
                <Route path="/contacto" element={<Contacto />} />
                <Route path="/legal" element={<Legal />} />

                <Route
                    path="*"
                    element={
                        <main className="wrap section">
                            <h1>Página no encontrada</h1>
                            <Link to="/">Volver al inicio</Link>
                        </main>
                    }
                />
            </Routes>

            <Footer />
        </>
    );
}

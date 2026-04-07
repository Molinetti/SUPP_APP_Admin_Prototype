// 👇 REPLACE THIS ENTIRE FILE with your artifact's code
// Just make sure the last line is:  export default YourComponentName

// ─── admin_side_app_VER3_1 ───────────────────────────────────────────
// Version: VER3_1
// Initialized: 2026-04-07
// Base: admin_side_app_VER3_0.jsx
// Changes in this version:
//   1. Removed UtentiPage component and its nav/render entries
//   2. Added star icon to icons object
//   3. Added ValutazioniPage with two empty tabs: Fornitori non tecnici / Fornitori Tecnici
//   4. Added "Valutazioni" to NAV at position 4 (before Schede di qualifica)
//   5. Rebuilt SUPPLIERS mock data: new fields profilo / tipo / categorie / val, removed stato / categoria
//   6. Replaced TypeIcon with ProfiloIcon (prof / soc / montana)
//   7. Rebuilt FornitoriPage table: Profilo | Tipo | Nome | Categorie | Val | Azioni
//   8. Added categoriaTag helper for coloured category tags (verde / giallo / rosso)
// ─────────────────────────────────────────────────────────────────────

import React, { useState, useEffect, useCallback } from "react";

// ─── Mock Data ───────────────────────────────────────────────────────
const SUPPLIERS = [
  { id: 1, name: "Marco Bianchi",          profilo: "prof", tipo: "T",  val: "3/5",
    categorie: [{ nome: "GIS", stato: "verde" }, { nome: "CAD", stato: "verde" }, { nome: "Idrogeologia", stato: "verde" }, { nome: "Sicurezza cantieri", stato: "giallo" }, { nome: "Due Diligence", stato: "rosso" }] },
  { id: 2, name: "Rossi & Partners S.r.l.", profilo: "soc",  tipo: "T",  val: "2/5",
    categorie: [{ nome: "VIA", stato: "verde" }, { nome: "VAS", stato: "giallo" }] },
  { id: 3, name: "Giulia Ferri",            profilo: "prof", tipo: "T",  val: "4/5",
    categorie: [{ nome: "Strutturale", stato: "verde" }] },
  { id: 4, name: "TechBuild S.p.A.",        profilo: "soc",  tipo: "T",  val: "N/D",
    categorie: [{ nome: "BIM", stato: "verde" }, { nome: "CAD", stato: "giallo" }, { nome: "Pratiche edilizie", stato: "giallo" }, { nome: "Topografia", stato: "rosso" }] },
  { id: 5, name: "Luca Moretti",            profilo: "prof", tipo: "T",  val: "N/D",
    categorie: [{ nome: "Geologia", stato: "giallo" }, { nome: "Idrogeologia", stato: "giallo" }] },
  { id: 6, name: "GreenWorks S.r.l.",       profilo: "montana", tipo: "NT", val: "5/5",
    categorie: [{ nome: "Manutenzione verde", stato: "verde" }] },
  { id: 7, name: "Anna Colombo",            profilo: "prof", tipo: "T",  val: "3/5",
    categorie: [{ nome: "Paesaggio", stato: "verde" }, { nome: "Progettazione del paesaggio", stato: "verde" }] },
  { id: 8, name: "Splendida S.r.l.",        profilo: "soc",  tipo: "NT", val: "N/D",
    categorie: [{ nome: "Pulizie", stato: "giallo" }] },
];

const QUALIFICHE = [
  { id: 1, name: "Informazioni di contatto", applies: "Professionista", categoria: "Anagrafica", attive: 18, inCorso: 2, richieste: 0 },
  { id: 2, name: "Dati aziendali e sede legale", applies: "Società", categoria: "Anagrafica", attive: 14, inCorso: 3, richieste: 1 },
  { id: 3, name: "Dati fiscali e sede legale", applies: "Entrambi", categoria: "Anagrafica", attive: 30, inCorso: 4, richieste: 0 },
  { id: 4, name: "Informazioni bancarie", applies: "Entrambi", categoria: "Anagrafica", attive: 28, inCorso: 5, richieste: 2 },
  { id: 5, name: "Dati fiscali Italy", applies: "Entrambi", categoria: "Anagrafica", attive: 26, inCorso: 3, richieste: 0 },
  { id: 6, name: "Documenti Amministrativi", applies: "Entrambi", categoria: "Amministrativa", attive: 22, inCorso: 6, richieste: 4 },
  { id: 7, name: "Autorizzazioni", applies: "Entrambi", categoria: "Tecnica", attive: 8, inCorso: 2, richieste: 3 },
  { id: 8, name: "VIA", applies: "Entrambi", categoria: "Tecnica", attive: 11, inCorso: 3, richieste: 5 },
  { id: 9, name: "VAS", applies: "Entrambi", categoria: "Tecnica", attive: 6, inCorso: 1, richieste: 2 },
  { id: 10, name: "Pratiche edilizie", applies: "Entrambi", categoria: "Tecnica", attive: 9, inCorso: 2, richieste: 4 },
  { id: 11, name: "Pianificazione e vincolistica", applies: "Entrambi", categoria: "Tecnica", attive: 5, inCorso: 1, richieste: 1 },
  { id: 12, name: "Paesaggio", applies: "Entrambi", categoria: "Tecnica", attive: 7, inCorso: 2, richieste: 3 },
  { id: 13, name: "Archeologia", applies: "Entrambi", categoria: "Tecnica", attive: 4, inCorso: 1, richieste: 2 },
  { id: 14, name: "Acustica", applies: "Entrambi", categoria: "Tecnica", attive: 6, inCorso: 0, richieste: 3 },
  { id: 15, name: "Atmosfera", applies: "Entrambi", categoria: "Tecnica", attive: 5, inCorso: 1, richieste: 1 },
  { id: 16, name: "Biodiversità - VINCA", applies: "Entrambi", categoria: "Tecnica", attive: 3, inCorso: 2, richieste: 4 },
  { id: 17, name: "Agronomia", applies: "Entrambi", categoria: "Tecnica", attive: 4, inCorso: 0, richieste: 2 },
  { id: 18, name: "Analisi di rischio", applies: "Entrambi", categoria: "Tecnica", attive: 7, inCorso: 1, richieste: 1 },
  { id: 19, name: "GIS", applies: "Entrambi", categoria: "Tecnica", attive: 10, inCorso: 3, richieste: 2 },
  { id: 20, name: "Civile", applies: "Entrambi", categoria: "Tecnica", attive: 15, inCorso: 4, richieste: 6 },
  { id: 21, name: "Geotecnica", applies: "Entrambi", categoria: "Tecnica", attive: 8, inCorso: 2, richieste: 3 },
  { id: 22, name: "Idraulica", applies: "Entrambi", categoria: "Tecnica", attive: 9, inCorso: 1, richieste: 2 },
  { id: 23, name: "Strutturale", applies: "Entrambi", categoria: "Tecnica", attive: 12, inCorso: 3, richieste: 5 },
  { id: 24, name: "Elettrica", applies: "Entrambi", categoria: "Tecnica", attive: 11, inCorso: 2, richieste: 4 },
  { id: 25, name: "Processo", applies: "Entrambi", categoria: "Tecnica", attive: 6, inCorso: 1, richieste: 1 },
  { id: 26, name: "Antincendio", applies: "Entrambi", categoria: "Tecnica", attive: 7, inCorso: 2, richieste: 3 },
  { id: 27, name: "Progettazione del paesaggio", applies: "Entrambi", categoria: "Tecnica", attive: 4, inCorso: 1, richieste: 2 },
  { id: 28, name: "Ingegneria per adattamenti ai cambiamenti climatici", applies: "Entrambi", categoria: "Tecnica", attive: 2, inCorso: 1, richieste: 3 },
  { id: 29, name: "Sostenibilità per la progettazione: LCA", applies: "Entrambi", categoria: "Tecnica", attive: 3, inCorso: 0, richieste: 2 },
  { id: 30, name: "Sostenibilità per la progettazione: Carbon footprint", applies: "Entrambi", categoria: "Tecnica", attive: 4, inCorso: 1, richieste: 1 },
  { id: 31, name: "Sostenibilità per la progettazione: Sostenibilità sociale", applies: "Entrambi", categoria: "Tecnica", attive: 2, inCorso: 0, richieste: 1 },
  { id: 32, name: "CAM", applies: "Entrambi", categoria: "Tecnica", attive: 8, inCorso: 2, richieste: 3 },
  { id: 33, name: "Computi metrici e capitolati", applies: "Entrambi", categoria: "Tecnica", attive: 13, inCorso: 3, richieste: 4 },
  { id: 34, name: "Efficienza energetica", applies: "Entrambi", categoria: "Tecnica", attive: 9, inCorso: 2, richieste: 5 },
  { id: 35, name: "Idrogeologia", applies: "Entrambi", categoria: "Tecnica", attive: 5, inCorso: 1, richieste: 2 },
  { id: 36, name: "Topografia", applies: "Entrambi", categoria: "Tecnica", attive: 7, inCorso: 0, richieste: 1 },
  { id: 37, name: "CAD", applies: "Entrambi", categoria: "Tecnica", attive: 16, inCorso: 4, richieste: 3 },
  { id: 38, name: "BIM", applies: "Entrambi", categoria: "Tecnica", attive: 12, inCorso: 3, richieste: 6 },
  { id: 39, name: "Collaudatore", applies: "Entrambi", categoria: "Tecnica", attive: 6, inCorso: 1, richieste: 2 },
  { id: 40, name: "Direzione lavori", applies: "Entrambi", categoria: "Tecnica", attive: 10, inCorso: 2, richieste: 4 },
  { id: 41, name: "Sicurezza cantieri", applies: "Entrambi", categoria: "Tecnica", attive: 8, inCorso: 3, richieste: 3 },
  { id: 42, name: "Due diligence", applies: "Entrambi", categoria: "Tecnica", attive: 5, inCorso: 1, richieste: 2 },
  { id: 43, name: "Geologia", applies: "Entrambi", categoria: "Tecnica", attive: 6, inCorso: 2, richieste: 1 },
  { id: 44, name: "Esecuzione indagini", applies: "Entrambi", categoria: "Tecnica", attive: 4, inCorso: 1, richieste: 3 },
  { id: 45, name: "Amianto", applies: "Entrambi", categoria: "Tecnica", attive: 3, inCorso: 1, richieste: 1 },
  { id: 46, name: "Sicurezza aziendale (HS)", applies: "Entrambi", categoria: "Tecnica", attive: 7, inCorso: 2, richieste: 2 },
  { id: 47, name: "Sostenibilità ambientale", applies: "Entrambi", categoria: "Tecnica", attive: 5, inCorso: 1, richieste: 4 },
  { id: 48, name: "ISO", applies: "Entrambi", categoria: "Tecnica", attive: 9, inCorso: 3, richieste: 2 },
];

const CATEGORIE_COMMERCIALI = [
  // ── Tecnica — drawn from QUALIFICHE ──────────────────────────────
  { id: 1,  nome: "Autorizzazioni",                                              tipologia: "Tecnica", applicabile: "Entrambi" },
  { id: 2,  nome: "VIA",                                                         tipologia: "Tecnica", applicabile: "Entrambi" },
  { id: 3,  nome: "VAS",                                                         tipologia: "Tecnica", applicabile: "Entrambi" },
  { id: 4,  nome: "Pratiche edilizie",                                           tipologia: "Tecnica", applicabile: "Entrambi" },
  { id: 5,  nome: "Pianificazione e vincolistica",                               tipologia: "Tecnica", applicabile: "Entrambi" },
  { id: 6,  nome: "Paesaggio",                                                   tipologia: "Tecnica", applicabile: "Entrambi" },
  { id: 7,  nome: "Archeologia",                                                 tipologia: "Tecnica", applicabile: "Entrambi" },
  { id: 8,  nome: "Acustica",                                                    tipologia: "Tecnica", applicabile: "Entrambi" },
  { id: 9,  nome: "Atmosfera",                                                   tipologia: "Tecnica", applicabile: "Entrambi" },
  { id: 10, nome: "Biodiversità - VINCA",                                        tipologia: "Tecnica", applicabile: "Entrambi" },
  { id: 11, nome: "Agronomia",                                                   tipologia: "Tecnica", applicabile: "Entrambi" },
  { id: 12, nome: "Analisi di rischio",                                          tipologia: "Tecnica", applicabile: "Entrambi" },
  { id: 13, nome: "GIS",                                                         tipologia: "Tecnica", applicabile: "Entrambi" },
  { id: 14, nome: "Civile",                                                      tipologia: "Tecnica", applicabile: "Entrambi" },
  { id: 15, nome: "Geotecnica",                                                  tipologia: "Tecnica", applicabile: "Entrambi" },
  { id: 16, nome: "Idraulica",                                                   tipologia: "Tecnica", applicabile: "Entrambi" },
  { id: 17, nome: "Strutturale",                                                 tipologia: "Tecnica", applicabile: "Entrambi" },
  { id: 18, nome: "Elettrica",                                                   tipologia: "Tecnica", applicabile: "Entrambi" },
  { id: 19, nome: "Processo",                                                    tipologia: "Tecnica", applicabile: "Entrambi" },
  { id: 20, nome: "Antincendio",                                                 tipologia: "Tecnica", applicabile: "Entrambi" },
  { id: 21, nome: "Progettazione del paesaggio",                                 tipologia: "Tecnica", applicabile: "Entrambi" },
  { id: 22, nome: "Ingegneria per adattamenti ai cambiamenti climatici",         tipologia: "Tecnica", applicabile: "Entrambi" },
  { id: 23, nome: "Sostenibilità per la progettazione: LCA",                    tipologia: "Tecnica", applicabile: "Entrambi" },
  { id: 24, nome: "Sostenibilità per la progettazione: Carbon footprint",       tipologia: "Tecnica", applicabile: "Entrambi" },
  { id: 25, nome: "Sostenibilità per la progettazione: Sostenibilità sociale",  tipologia: "Tecnica", applicabile: "Entrambi" },
  { id: 26, nome: "CAM",                                                         tipologia: "Tecnica", applicabile: "Entrambi" },
  { id: 27, nome: "Computi metrici e capitolati",                                tipologia: "Tecnica", applicabile: "Entrambi" },
  { id: 28, nome: "Efficienza energetica",                                       tipologia: "Tecnica", applicabile: "Entrambi" },
  { id: 29, nome: "Idrogeologia",                                                tipologia: "Tecnica", applicabile: "Entrambi" },
  { id: 30, nome: "Topografia",                                                  tipologia: "Tecnica", applicabile: "Entrambi" },
  { id: 31, nome: "CAD",                                                         tipologia: "Tecnica", applicabile: "Entrambi" },
  { id: 32, nome: "BIM",                                                         tipologia: "Tecnica", applicabile: "Entrambi" },
  { id: 33, nome: "Collaudatore",                                                tipologia: "Tecnica", applicabile: "Entrambi" },
  { id: 34, nome: "Direzione lavori",                                            tipologia: "Tecnica", applicabile: "Entrambi" },
  { id: 35, nome: "Sicurezza cantieri",                                          tipologia: "Tecnica", applicabile: "Entrambi" },
  { id: 36, nome: "Due diligence",                                               tipologia: "Tecnica", applicabile: "Entrambi" },
  { id: 37, nome: "Geologia",                                                    tipologia: "Tecnica", applicabile: "Entrambi" },
  { id: 38, nome: "Esecuzione indagini",                                         tipologia: "Tecnica", applicabile: "Entrambi" },
  { id: 39, nome: "Amianto",                                                     tipologia: "Tecnica", applicabile: "Entrambi" },
  { id: 40, nome: "Sicurezza aziendale (HS)",                                    tipologia: "Tecnica", applicabile: "Entrambi" },
  { id: 41, nome: "Sostenibilità ambientale",                                    tipologia: "Tecnica", applicabile: "Entrambi" },
  { id: 42, nome: "ISO",                                                         tipologia: "Tecnica",     applicabile: "Entrambi" },
  // ── Non tecnica ──────────────────────────────────────────────────
  { id: 43, nome: "Pulizie",                                                     tipologia: "Non tecnica", applicabile: "Entrambi" },
  { id: 44, nome: "Manutenzione ordinaria e straordinaria",                      tipologia: "Non tecnica", applicabile: "Entrambi" },
  { id: 45, nome: "Manutenzione verde",                                          tipologia: "Non tecnica", applicabile: "Entrambi" },
  { id: 46, nome: "Forniture arredi",                                            tipologia: "Non tecnica", applicabile: "Entrambi" },
  { id: 47, nome: "Forniture Cancelleria",                                       tipologia: "Non tecnica", applicabile: "Entrambi" },
  { id: 48, nome: "Forniture DPI",                                               tipologia: "Non tecnica", applicabile: "Entrambi" },
  { id: 49, nome: "Dotazioni Informatiche",                                      tipologia: "Non tecnica", applicabile: "Entrambi" },
  { id: 50, nome: "Materiale cucina",                                            tipologia: "Non tecnica", applicabile: "Entrambi" },
  { id: 51, nome: "Studi notarili",                                              tipologia: "Non tecnica", applicabile: "Entrambi" },
  { id: 52, nome: "Avvocati",                                                    tipologia: "Non tecnica", applicabile: "Entrambi" },
  { id: 53, nome: "Gestione rifiuti uffici",                                     tipologia: "Non tecnica", applicabile: "Entrambi" },
  { id: 54, nome: "Enti fiera / organizzatori eventi",                           tipologia: "Non tecnica", applicabile: "Entrambi" },
  { id: 55, nome: "Software",                                                    tipologia: "Non tecnica", applicabile: "Entrambi" },
  { id: 56, nome: "Allestitori",                                                 tipologia: "Non tecnica", applicabile: "Entrambi" },
  { id: 57, nome: "Forniture e riparazioni attrezzature tecniche (es. drone)",   tipologia: "Non tecnica", applicabile: "Entrambi" },
  { id: 58, nome: "Copisteria",                                                  tipologia: "Non tecnica", applicabile: "Entrambi" },
  { id: 59, nome: "Catering ufficio",                                            tipologia: "Non tecnica", applicabile: "Entrambi" },
  { id: 60, nome: "Catering fiera",                                              tipologia: "Non tecnica", applicabile: "Entrambi" },
  { id: 61, nome: "Servizi in fiera",                                            tipologia: "Non tecnica", applicabile: "Entrambi" },
  { id: 62, nome: "Autonoleggi",                                                 tipologia: "Non tecnica", applicabile: "Entrambi" },
  { id: 63, nome: "Agenzie viaggio",                                             tipologia: "Non tecnica", applicabile: "Entrambi" },
  { id: 64, nome: "Hotel / ristoranti",                                          tipologia: "Non tecnica", applicabile: "Entrambi" },
  { id: 65, nome: "Trasporti",                                                   tipologia: "Non tecnica", applicabile: "Entrambi" },
  { id: 66, nome: "Associazioni",                                                tipologia: "Non tecnica", applicabile: "Entrambi" },
  { id: 67, nome: "Riviste",                                                     tipologia: "Non tecnica", applicabile: "Entrambi" },
  { id: 68, nome: "Banche dati",                                                 tipologia: "Non tecnica", applicabile: "Entrambi" },
  { id: 69, nome: "Enti formativi",                                              tipologia: "Non tecnica", applicabile: "Entrambi" },
  { id: 70, nome: "Enti pubblici",                                               tipologia: "Non tecnica", applicabile: "Entrambi" },
];

const RICHIESTE = [
  // Marco Bianchi — pinpointed rows from scheda
  { id: 1,  fornitore: "Marco Bianchi",           qualifica: "Informazioni bancarie",         categoria: "Anagrafica",      data: "2025-03-20", stato: "Incompleto" },
  { id: 2,  fornitore: "Marco Bianchi",           qualifica: "Documenti Amministrativi",      categoria: "Amministrativa",  data: "2025-03-19", stato: "Incompleto" },
  { id: 3,  fornitore: "Marco Bianchi",           qualifica: "Sicurezza cantieri",            categoria: "Tecnica",         data: "2025-03-18", stato: "Da revisionare" },
  { id: 4,  fornitore: "Marco Bianchi",           qualifica: "Due diligence",                 categoria: "Tecnica",         data: "2025-03-17", stato: "Incompleto" },
  // Free distribution
  { id: 5,  fornitore: "TechBuild S.p.A.",        qualifica: "BIM",                           categoria: "Tecnica",         data: "2025-03-16", stato: "Da revisionare" },
  { id: 6,  fornitore: "Giulia Ferri",            qualifica: "VIA",                           categoria: "Tecnica",         data: "2025-03-15", stato: "Incompleto" },
  { id: 7,  fornitore: "GreenWorks S.r.l.",       qualifica: "Documenti Amministrativi",      categoria: "Amministrativa",  data: "2025-03-14", stato: "Da revisionare" },
  { id: 8,  fornitore: "Anna Colombo",            qualifica: "Informazioni bancarie",         categoria: "Anagrafica",      data: "2025-03-13", stato: "Incompleto" },
  { id: 9,  fornitore: "Edilizia Moderna S.p.A.", qualifica: "ISO",                           categoria: "Tecnica",         data: "2025-03-12", stato: "Da revisionare" },
  { id: 10, fornitore: "Rossi & Partners S.r.l.", qualifica: "CAD",                           categoria: "Tecnica",         data: "2025-03-11", stato: "Incompleto" },
  { id: 11, fornitore: "Luca Moretti",            qualifica: "Dati fiscali e sede legale",    categoria: "Anagrafica",      data: "2025-03-10", stato: "Da revisionare" },
  { id: 12, fornitore: "TechBuild S.p.A.",        qualifica: "Sicurezza cantieri",            categoria: "Tecnica",         data: "2025-03-09", stato: "Incompleto" },
  { id: 13, fornitore: "Giulia Ferri",            qualifica: "Geologia",                      categoria: "Tecnica",         data: "2025-03-08", stato: "Da revisionare" },
  { id: 14, fornitore: "GreenWorks S.r.l.",       qualifica: "GIS",                           categoria: "Tecnica",         data: "2025-03-07", stato: "Incompleto" },
  { id: 15, fornitore: "Marco Bianchi",           qualifica: "Strutturale",                   categoria: "Tecnica",         data: "2025-04-11", stato: "Richiesta di accesso" },
];

// ─── Scheda Fornitore Mock Data ──────────────────────────────────────
const SCHEDA_PROFILE = {
  ragioneSociale: "Tecnostudio Srl", partitaIva: "IT09876543210", registrationNo: "", codiceFiscale: "09876543210",
  indirizzo: "Corso Magenta 12", cap: "20123", citta: "Milano", nazione: "Italia", telefonoSede: "+39 02 9876543", pec: "tecnostudio@pec.it",
  nomeContatto: "Laura", cognomeContatto: "Verdi", telefonoContatto: "+39 02 5551234", cellulareContatto: "+39 348 5551234",
  emailContatto: "l.verdi@tecnostudio.it", sitoContatto: "www.tecnostudio.it",
  intestatario: "", banca: "", iban: "", contoNonEu: "", swift: "",
  regimeAgevolato: "No", ritenuta: "Sì", previdenziale: "Sì", cassa: "Inarcassa", percentuale: "4%",
};

const SCHEDA_DOCS = [
  { name: "Visura Camerale", uploaded: true, file: "visura_camerale.pdf" },
  { name: "DURC", hasExpiry: true, uploaded: true, file: "DURC_2026.pdf", expiry: "30/06/2026" },
  { name: "Informativa privacy", uploaded: false },
  { name: "NDA", uploaded: true, file: "NDA_tecnostudio.pdf" },
  { name: "Accettazione codice etico", uploaded: false },
  { name: "Dichiarazione su RC professionale", uploaded: false },
];

const SCHEDA_QUALIFICHE_ATTIVE = [
  { id: "cad", name: "CAD", desc: "Progettazione assistita e modellazione 2D/3D.", status: "Completo",
    fields: [{ label: "Referente", value: "Marco Bianchi" }, { label: "Certificazione", type: "doc", value: "CAD_Professional.pdf" }] },
  { id: "gis", name: "GIS", desc: "Sistemi informativi geografici e analisi spaziale.", status: "Completo",
    fields: [{ label: "Referente", value: "Mario Rossi" }, { label: "Certificazione", type: "doc", value: "GIS_Specialist.pdf" }] },
  { id: "idro", name: "Idrogeologia", desc: "Studio dei sistemi acquiferi e valutazione delle interazioni tra acque sotterranee e opere civili.", status: "Completo",
    fields: [{ label: "Ordine", value: "Geologi" }, { label: "Regione", value: "Lombardia" }, { label: "N. di iscrizione", value: "1234" }, { label: "Data di iscrizione", value: "15/11/2023" }, { label: "In regola con CFP obbligatori", value: "Sì" }] },
  { id: "sic", name: "Sicurezza cantieri", desc: "Coordinamento della sicurezza in fase di progettazione e di esecuzione.", status: "In revisione",
    fields: [{ label: "Referente", value: "Laura Verdi" }, { label: "Attestato", type: "doc", value: "attestato_di_formazione_CSP_CSE.pdf" }] },
  { id: "dd", name: "Due diligence", desc: "Analisi tecnico-ambientale a supporto di operazioni immobiliari e industriali.", status: "Incompleto",
    fields: [{ label: "Referente", value: "Paolo Ferretti" }, { label: "Certificazione", type: "doc", value: null }] },
];

// ─── Helpers ─────────────────────────────────────────────────────────
const statusBadge = (status) => {
  const map = {
    // Fornitori stati
    "Qualificato":    { bg: "#e6f4ed", color: "#006630", border: "#b2dfcc" },  // green
    "Incompleto":     { bg: "#F8D7DA", color: "#842029", border: "#F5C2C7" },  // red
    "Inizializzato":  { bg: "#FFF3CD", color: "#856404", border: "#FFE69C" },  // yellow
    // Legacy / other uses
    "Attivo":         { bg: "#e6f4ed", color: "#006630", border: "#b2dfcc" },
    "In attesa":      { bg: "#FFF3CD", color: "#856404", border: "#FFE69C" },
    "Sospeso":        { bg: "#F8D7DA", color: "#842029", border: "#F5C2C7" },
    "Azione richiesta":   { bg: "#FFF3CD", color: "#856404", border: "#FFE69C" },
    "In attesa fornitore":{ bg: "#e8f0fe", color: "#3b6db5", border: "#c4d7f2" },
    "Attiva":         { bg: "#e6f4ed", color: "#006630", border: "#b2dfcc" },
    "Scaduta":        { bg: "#F8D7DA", color: "#842029", border: "#F5C2C7" },
    "In revisione":   { bg: "#FFF3CD", color: "#856404", border: "#FFE69C" },
  };
  const s = map[status] || { bg: "#f0f0f0", color: "#555", border: "#ddd" };
  return { display: "inline-block", padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 500, background: s.bg, color: s.color, border: `1px solid ${s.border}`, whiteSpace: "nowrap" };
};

// Field-level validation tag — same pill shape as status badges
const fieldTagStyle = (tag) => {
  const map = {
    "Validato":      { bg: "#e6f4ed", color: "#006630", border: "#b2dfcc" },
    "In validazione":{ bg: "#FFF3CD", color: "#856404", border: "#FFE69C" },
    "Da completare": { bg: "#F8D7DA", color: "#842029", border: "#F5C2C7" },
  };
  const s = map[tag] || { bg: "#f0f0f0", color: "#555", border: "#ddd" };
  return { display: "inline-block", padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 500,
    background: s.bg, color: s.color, border: `1px solid ${s.border}`, whiteSpace: "nowrap" };
};

// ─── Icons (inline SVG) ──────────────────────────────────────────────
const Icon = ({ d, size = 18, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>{d}</svg>
);

const icons = {
  dashboard: <><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>,
  fornitori: <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></>,
  qualifiche: <><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></>,
  richieste: <><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></>,
  datiPersonali: <><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4-4v2"/><circle cx="12" cy="7" r="4"/></>,
  menu: <><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></>,
  close: <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
  back: <><polyline points="15 18 9 12 15 6"/></>,
  prof: <><circle cx="12" cy="7" r="4"/><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4-4v2"/></>,
  soc: <><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 7V5a4 4 0 00-8 0v2"/></>,
  sort: <><polyline points="7 3 7 21"/><polyline points="3 7 7 3 11 7"/><polyline points="17 21 17 3"/><polyline points="13 17 17 21 21 17"/></>,
  categorie: <><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/><path d="M7 8h4"/><path d="M7 12h10"/></>,
  valutazioni: <><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></>,
};

const ProfiloIcon = ({ profilo }) => {
  if (profilo === "montana") return (
    <div style={{ width: 22, height: 22, borderRadius: "50%", background: "#00833E", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
      <span style={{ fontSize: 11, fontWeight: 700, color: "#fff", lineHeight: 1 }}>M</span>
    </div>
  );
  const d = profilo === "prof" ? icons.prof : icons.soc;
  return <Icon d={d} size={16} style={{ color: "#888" }} />;
};

// ─── Styles ──────────────────────────────────────────────────────────
const S = {
  page: { background: "#f7f8f6", minHeight: "100vh", fontFamily: "'DM Sans','Segoe UI',system-ui,sans-serif" },
  header: { position: "fixed", top: 0, left: 0, right: 0, height: 56, background: "#fff", borderBottom: "1px solid #e0e0dc", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", zIndex: 20, boxSizing: "border-box" },
  headerLeft: { display: "flex", alignItems: "center", gap: 16 },
  headerRight: { display: "flex", alignItems: "center", gap: 16 },
  toggleBtn: { background: "none", border: "none", cursor: "pointer", padding: 4, color: "#333", display: "flex", alignItems: "center" },
  vDivider: { width: 1, height: 24, background: "#ddd" },
  appTitle: { fontSize: 16, fontWeight: 600, color: "#1a1a1a", letterSpacing: -0.2 },
  userName: { fontSize: 13, fontWeight: 400, color: "#888" },
  avatar: { width: 32, height: 32, borderRadius: "50%", background: "#e6f4ed", color: "#00833E", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center" },
  sidebar: (expanded) => ({ position: "fixed", top: 56, left: 0, bottom: 0, width: expanded ? 240 : 56, background: "#eaf5ee", borderRight: "1px solid #cce4d3", zIndex: 10, transition: "width 0.25s cubic-bezier(.4,0,.2,1)", overflow: "hidden", display: "flex", flexDirection: "column" }),
  navItem: (active, expanded) => ({
    display: "flex", alignItems: "center", gap: expanded ? 12 : 0, justifyContent: expanded ? "flex-start" : "center",
    padding: expanded ? "11px 20px" : "11px 0",
    background: active ? "#d2ecd9" : "transparent",
    color: active ? "#006630" : "#444",
    fontWeight: active ? 600 : 400,
    fontSize: 14, cursor: "pointer", border: "none", width: "100%", textAlign: "left",
    borderRight: active ? "3px solid #00833E" : "3px solid transparent",
    transition: "background 0.15s, padding 0.25s",
    whiteSpace: "nowrap",
    fontFamily: "inherit",
  }),
  sidebarFooter: (expanded) => ({ padding: "16px 20px", borderTop: "1px solid #cce4d3", fontSize: 12, color: "#5a9b6e", display: expanded ? "block" : "none", marginTop: "auto" }),
  main: (sidebarW) => ({ marginLeft: sidebarW, marginTop: 56, padding: "32px 40px", maxWidth: 960, transition: "margin-left 0.25s cubic-bezier(.4,0,.2,1)", boxSizing: "border-box" }),
  h1: { fontSize: 24, fontWeight: 600, color: "#1a1a1a", margin: "0 0 6px" },
  subtitle: { fontSize: 14, fontWeight: 400, color: "#888", margin: "0 0 28px" },
  h2: { fontSize: 18, fontWeight: 600, color: "#1a1a1a", margin: "28px 0 14px" },
  h3: { fontSize: 15, fontWeight: 600, color: "#1a1a1a", margin: "0 0 12px" },
  card: { background: "#fff", border: "1px solid #e8e8e5", borderRadius: 10, padding: "20px 24px", marginBottom: 16 },
  tab: (active) => ({ padding: "10px 20px", fontSize: 14, fontWeight: 500, cursor: "pointer", color: active ? "#00833E" : "#888", background: "transparent", border: "none", borderBottom: `2px solid ${active ? "#00833E" : "transparent"}`, fontFamily: "inherit" }),
  btnPrimary: { background: "#00833E", color: "#fff", border: "none", borderRadius: 8, padding: "10px 22px", fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: "inherit", transition: "background 0.15s" },
  btnSecondary: { background: "#fff", color: "#00833E", border: "1.5px solid #00833E", borderRadius: 8, padding: "9px 20px", fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: "inherit" },
  btnGhost: { background: "transparent", color: "#888", border: "1px solid #ddd", borderRadius: 8, padding: "9px 20px", fontSize: 14, cursor: "pointer", fontFamily: "inherit" },
  input: { width: "100%", padding: "9px 12px", border: "1px solid #ddd", borderRadius: 8, fontSize: 14, fontFamily: "inherit", boxSizing: "border-box", outline: "none" },
  table: { width: "100%", borderCollapse: "collapse", fontSize: 14 },
  th: { fontSize: 12, fontWeight: 600, color: "#555", textTransform: "uppercase", letterSpacing: 0.5, padding: "10px 12px", borderBottom: "2px solid #e8e8e5", textAlign: "left", cursor: "pointer", userSelect: "none", whiteSpace: "nowrap" },
  td: { padding: "12px", borderBottom: "1px solid #f0f0ee", color: "#333" },
  actionsPanel: { background: "#fffdf5", border: "1px solid #f0e6c0", borderRadius: 10, padding: "20px 24px", marginBottom: 16 },
  placeholder: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 300, color: "#aaa", fontSize: 16, gap: 12 },
};

// ─── Main App ────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("login");
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [toast, setToast] = useState(null);
  const [schedaSupplier, setSchedaSupplier] = useState(null);
  const [schedaBackLabel, setSchedaBackLabel] = useState("Torna ai fornitori");
  const [schedaBackPage, setSchedaBackPage] = useState("fornitori");
  const [schedaOnBack, setSchedaOnBack] = useState(null);
  const [qualificaDetail, setQualificaDetail] = useState(null);
  const [categoriaDetail, setCategoriaDetail] = useState(null);
  const [nuovoFornitore, setNuovoFornitore] = useState(false);

  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  }, []);

  const nav = (p) => {
    setPage(p);
    setSchedaSupplier(null);
    setQualificaDetail(null);
    setCategoriaDetail(null);
    setNuovoFornitore(false);
  };

  // Open scheda from any context — caller sets back destination
  const openScheda = (supplier, backPage = "fornitori", backLabel = "Torna ai fornitori", onBack = null) => {
    setSchedaSupplier(supplier);
    setSchedaBackPage(backPage);
    setSchedaBackLabel(backLabel);
    setSchedaOnBack(() => onBack);
  };

  // Login screen
  if (page === "login") return <LoginScreen onLogin={() => setPage("dashboard")} />;

  // Scheda Fornitore — full tabbed view
  if (schedaSupplier) {
    const sW = sidebarExpanded ? 240 : 56;
    return (
      <div style={S.page}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet"/>
        <Header expanded={sidebarExpanded} onToggle={() => setSidebarExpanded(!sidebarExpanded)} />
        <Sidebar page={page} onNav={nav} expanded={sidebarExpanded} />
        <div style={S.main(sW)}>
          <button onClick={() => { setSchedaSupplier(null); if (schedaOnBack) schedaOnBack(); else setPage(schedaBackPage); }} style={{ ...S.btnGhost, display: "flex", alignItems: "center", gap: 6, marginBottom: 20, padding: "7px 16px" }}>
            <Icon d={icons.back} size={16} /> {schedaBackLabel}
          </button>
          <SchedaFornitore supplier={schedaSupplier} showToast={showToast} />
        </div>
        {toast && <Toast msg={toast} />}
      </div>
    );
  }

  // Qualifica detail page
  if (qualificaDetail) {
    const sW = sidebarExpanded ? 240 : 56;
    return (
      <div style={S.page}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet"/>
        <Header expanded={sidebarExpanded} onToggle={() => setSidebarExpanded(!sidebarExpanded)} />
        <Sidebar page={page} onNav={nav} expanded={sidebarExpanded} />
        <div style={S.main(sW)}>
          <button onClick={() => setQualificaDetail(null)} style={{ ...S.btnGhost, display: "flex", alignItems: "center", gap: 6, marginBottom: 20, padding: "7px 16px" }}>
            <Icon d={icons.back} size={16} /> Torna alle qualifiche
          </button>
          <h1 style={S.h1}>{qualificaDetail.name}</h1>
          <p style={S.subtitle}>{qualificaDetail.categoria} — {qualificaDetail.applies}</p>
          <QualificaDetailPage qualifica={qualificaDetail} showToast={showToast} onOpenScheda={(s) => openScheda(s, "qualifica", "Torna alla qualifica", () => setQualificaDetail(qualificaDetail))} />
        </div>
        {toast && <Toast msg={toast} />}
      </div>
    );
  }

  // Nuovo Fornitore — creation page
  if (nuovoFornitore) {
    const sW = sidebarExpanded ? 240 : 56;
    return (
      <div style={S.page}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet"/>
        <Header expanded={sidebarExpanded} onToggle={() => setSidebarExpanded(!sidebarExpanded)} />
        <Sidebar page={page} onNav={nav} expanded={sidebarExpanded} />
        <div style={S.main(sW)}>
          <button onClick={() => setNuovoFornitore(false)} style={{ ...S.btnGhost, display: "flex", alignItems: "center", gap: 6, marginBottom: 20, padding: "7px 16px" }}>
            <Icon d={icons.back} size={16} /> Torna ai fornitori
          </button>
          <h1 style={S.h1}>Nuovo Fornitore</h1>
          <p style={S.subtitle}>Configura il profilo del nuovo fornitore</p>
          <NuovoFornitoreForm showToast={showToast} onComplete={() => { setNuovoFornitore(false); showToast("Fornitore creato con successo"); }} />
        </div>
        {toast && <Toast msg={toast} />}
      </div>
    );
  }

  // Categoria Commerciale detail page
  if (categoriaDetail) {
    const sW = sidebarExpanded ? 240 : 56;
    return (
      <div style={S.page}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet"/>
        <Header expanded={sidebarExpanded} onToggle={() => setSidebarExpanded(!sidebarExpanded)} />
        <Sidebar page={page} onNav={nav} expanded={sidebarExpanded} />
        <div style={S.main(sW)}>
          <button onClick={() => setCategoriaDetail(null)} style={{ ...S.btnGhost, display: "flex", alignItems: "center", gap: 6, marginBottom: 20, padding: "7px 16px" }}>
            <Icon d={icons.back} size={16} /> Torna alle categorie commerciali
          </button>
          <h1 style={S.h1}>{categoriaDetail.nome}</h1>
          <p style={S.subtitle}>{categoriaDetail.tipologia} — {categoriaDetail.applicabile}</p>
          <CategoriaCommercialeDetailPage categoria={categoriaDetail} showToast={showToast} onOpenScheda={(s) => openScheda(s, "categorie", "Torna alle categorie commerciali", () => setCategoriaDetail(categoriaDetail))} />
        </div>
        {toast && <Toast msg={toast} />}
      </div>
    );
  }

  const sW = sidebarExpanded ? 240 : 56;

  return (
    <div style={S.page}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet"/>
      <Header expanded={sidebarExpanded} onToggle={() => setSidebarExpanded(!sidebarExpanded)} />
      <Sidebar page={page} onNav={nav} expanded={sidebarExpanded} />
      <div style={S.main(sW)}>
        {page === "dashboard" && <RichiestePage onOpenScheda={(s) => openScheda(s, "dashboard", "Torna alla dashboard")} />}
        {page === "fornitori" && <FornitoriPage onOpenScheda={(s) => openScheda(s, "fornitori", "Torna ai fornitori")} onNuovoFornitore={() => setNuovoFornitore(true)} />}
        {page === "categorie" && <CategorieCommercialiPage onOpenDetail={setCategoriaDetail} />}
        {page === "qualifiche" && <QualifichePage onOpenDetail={setQualificaDetail} />}
        {page === "valutazioni" && <ValutazioniPage />}
        {page === "datiPersonali" && <DatiPersonaliPage showToast={showToast} />}
      </div>
      {toast && <Toast msg={toast} />}
    </div>
  );
}

// ─── Login ───────────────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  return (
    <div style={{ ...S.page, display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet"/>
      <div style={{ width: 400, background: "#fff", borderRadius: 14, padding: "40px 36px", border: "1px solid #e8e8e5" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
          <div style={{ height: 28, display: "flex", alignItems: "center" }}>
            <span style={{ fontSize: 22, fontWeight: 700, color: "#00833E", letterSpacing: -0.5 }}>Montana</span>
          </div>
          <div style={{ width: 1, height: 28, background: "#ddd" }}></div>
          <span style={{ fontSize: 15, fontWeight: 600, color: "#333" }}>Catalogo Fornitori</span>
        </div>
        <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#555", marginBottom: 5 }}>Email</label>
        <input type="email" style={{ ...S.input, marginBottom: 16 }} placeholder="admin@montana.it" />
        <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#555", marginBottom: 5 }}>Password</label>
        <input type="password" style={{ ...S.input, marginBottom: 24 }} placeholder="••••••••" />
        <button style={{ ...S.btnPrimary, width: "100%" }} onClick={onLogin} onMouseOver={e => e.target.style.background = "#007236"} onMouseOut={e => e.target.style.background = "#00833E"}>
          Accedi
        </button>
        <div style={{ textAlign: "center", marginTop: 16 }}>
          <span style={{ fontSize: 13, color: "#00833E", cursor: "pointer" }}>Password dimenticata?</span>
        </div>
      </div>
    </div>
  );
}

// ─── Header ──────────────────────────────────────────────────────────
function Header({ expanded, onToggle }) {
  return (
    <header style={S.header}>
      <div style={S.headerLeft}>
        <button style={S.toggleBtn} onClick={onToggle}>
          <Icon d={expanded ? icons.close : icons.menu} size={20} />
        </button>
        <span style={{ fontSize: 22, fontWeight: 700, color: "#00833E", letterSpacing: -0.5 }}>Montana</span>
        <div style={S.vDivider}></div>
        <span style={S.appTitle}>Catalogo Fornitori</span>
      </div>
      <div style={S.headerRight}>
        <span style={S.userName}>Admin User</span>
        <div style={S.avatar}>AU</div>
      </div>
    </header>
  );
}

// ─── Sidebar ─────────────────────────────────────────────────────────
const NAV = [
  { id: "dashboard", label: "Dashboard", icon: icons.dashboard },
  { id: "fornitori", label: "Fornitori", icon: icons.fornitori },
  { id: "categorie",    label: "Categorie Commerciali",       icon: icons.categorie },
  { id: "valutazioni",  label: "Valutazioni",                 icon: icons.valutazioni },
  { id: "qualifiche",   label: "Schede di qualifica (Legacy)", icon: icons.qualifiche },
  { id: "datiPersonali", label: "Dati Personali",             icon: icons.datiPersonali },
];

function Sidebar({ page, onNav, expanded }) {
  return (
    <aside style={S.sidebar(expanded)}>
      <nav style={{ flex: 1, paddingTop: 8 }}>
        {NAV.map(n => (
          <button key={n.id} style={S.navItem(page === n.id, expanded)} onClick={() => onNav(n.id)}>
            <Icon d={n.icon} size={18} />
            {expanded && <span>{n.label}</span>}
          </button>
        ))}
      </nav>
      <div style={S.sidebarFooter(expanded)}>Amministratore</div>
    </aside>
  );
}

// ─── Toast ───────────────────────────────────────────────────────────
function Toast({ msg }) {
  return (
    <div style={{ position: "fixed", bottom: 32, left: "50%", transform: "translateX(-50%)", background: "#00833E", color: "#fff", padding: "10px 24px", borderRadius: 8, fontSize: 14, fontWeight: 500, boxShadow: "0 4px 20px rgba(0,0,0,0.15)", zIndex: 999, animation: "fadeInUp 0.3s ease", fontFamily: "'DM Sans',sans-serif" }}>
      {msg}
      <style>{`@keyframes fadeInUp { from { opacity:0; transform:translateX(-50%) translateY(10px); } to { opacity:1; transform:translateX(-50%) translateY(0); } }`}</style>
    </div>
  );
}

// ─── Nuovo Fornitore Form ─────────────────────────────────────────────
function NuovoFornitoreForm({ showToast, onComplete }) {
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState(null);              // "prof" | "soc"
  const [tecnico, setTecnico] = useState(null);         // "tecnico" | "nontecnico"

  // Non tecnico state
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownFilter, setDropdownFilter] = useState("");
  const [categoriaSingola, setCategoriaSingola] = useState(null);
  const [attivaUtenza, setAttivaUtenza] = useState(null);

  // Tecnico state
  const [showModal, setShowModal] = useState(false);
  const [modalFilter, setModalFilter] = useState("");
  const [categorieSelezionate, setCategorieSelezionate] = useState([]); // array of category objects

  const nonTecnicheList = CATEGORIE_COMMERCIALI.filter(c => c.tipologia === "Non tecnica");
  const tecnicheList    = CATEGORIE_COMMERCIALI.filter(c => c.tipologia === "Tecnica");

  const categoriaSingolaObj = nonTecnicheList.find(c => c.id === categoriaSingola);

  const filteredNonTecniche = nonTecnicheList.filter(c =>
    c.nome.toLowerCase().includes(dropdownFilter.toLowerCase())
  );
  const filteredTecniche = tecnicheList.filter(c =>
    c.nome.toLowerCase().includes(modalFilter.toLowerCase()) &&
    !categorieSelezionate.find(s => s.id === c.id)
  );

  const removeCategoria = (id) => setCategorieSelezionate(prev => prev.filter(c => c.id !== id));
  const addCategoria    = (cat) => { setCategorieSelezionate(prev => [...prev, cat]); };

  const handleTecnicoChange = (val) => {
    setTecnico(val);
    setCategoriaSingola(null); setDropdownOpen(false); setDropdownFilter("");
    setAttivaUtenza(null);
    setCategorieSelezionate([]); setShowModal(false); setModalFilter("");
  };

  // Visibility
  const showDynamicZone = tecnico !== null;
  const showUtenza      = tecnico === "nontecnico" && categoriaSingola !== null;
  const showSubmit      = tecnico === "tecnico"
    ? categorieSelezionate.length > 0
    : attivaUtenza !== null;

  // Styles
  const choiceBtn = (active) => ({
    padding: "10px 24px", borderRadius: 8, fontSize: 14, fontWeight: 500,
    cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s",
    background: active ? "#00833E" : "#fff",
    color: active ? "#fff" : "#444",
    border: active ? "1.5px solid #00833E" : "1.5px solid #ddd",
  });

  const sectionLabel = { fontSize: 11, fontWeight: 600, color: "#aaa", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 12 };

  return (
    <div style={{ maxWidth: 640 }}>
      <style>{`@keyframes fadeInForm { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }`}</style>

      {/* ── Fixed top 3 cards ── */}

      {/* Card 1 — Nome */}
      <div style={{ ...S.card, marginBottom: 16 }}>
        <div style={sectionLabel}>Nome del fornitore</div>
        <input
          style={S.input}
          placeholder="Es. Mario Rossi, Tecnostudio Srl..."
          value={nome}
          onChange={e => setNome(e.target.value)}
        />
      </div>

      {/* Card 2 — Tipo */}
      <div style={{ ...S.card, marginBottom: 16 }}>
        <div style={sectionLabel}>Tipo di fornitore</div>
        <div style={{ display: "flex", gap: 12 }}>
          <button style={choiceBtn(tipo === "prof")} onClick={() => setTipo("prof")}>
            <Icon d={icons.prof} size={16} style={{ display: "inline", verticalAlign: "middle", marginRight: 8 }} />
            Professionista
          </button>
          <button style={choiceBtn(tipo === "soc")} onClick={() => setTipo("soc")}>
            <Icon d={icons.soc} size={16} style={{ display: "inline", verticalAlign: "middle", marginRight: 8 }} />
            Società
          </button>
        </div>
      </div>

      {/* Card 3 — Tecnico / Non tecnico */}
      <div style={{ ...S.card, marginBottom: 16 }}>
        <div style={sectionLabel}>Tipologia fornitore</div>
        <div style={{ display: "flex", gap: 12 }}>
          <button style={choiceBtn(tecnico === "nontecnico")} onClick={() => handleTecnicoChange("nontecnico")}>
            Fornitore non tecnico
          </button>
          <button style={choiceBtn(tecnico === "tecnico")} onClick={() => handleTecnicoChange("tecnico")}>
            Fornitore tecnico
          </button>
        </div>
      </div>

      {/* ── Dynamic zone — appears once tecnico/nontecnico is chosen ── */}
      {showDynamicZone && (
        <div style={{ animation: "fadeInForm 0.2s ease" }}>

          {/* ── Non tecnico route ── */}
          {tecnico === "nontecnico" && (
            <>
              {/* Categoria — custom filterable dropdown */}
              <div style={{ ...S.card, marginBottom: 16 }}>
                <div style={sectionLabel}>Categoria commerciale</div>

                {/* Trigger button */}
                <div style={{ position: "relative" }}>
                  <button
                    style={{ ...S.input, textAlign: "left", cursor: "pointer", background: "#fff", color: categoriaSingola ? "#333" : "#aaa", display: "flex", justifyContent: "space-between", alignItems: "center" }}
                    onClick={() => { setDropdownOpen(o => !o); setDropdownFilter(""); }}
                  >
                    <span>{categoriaSingolaObj ? categoriaSingolaObj.nome : "Seleziona una categoria..."}</span>
                    <span style={{ fontSize: 10, color: "#aaa" }}>{dropdownOpen ? "▲" : "▼"}</span>
                  </button>

                  {/* Dropdown panel */}
                  {dropdownOpen && (
                    <div style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0, background: "#fff", border: "1px solid #ddd", borderRadius: 8, boxShadow: "0 4px 20px rgba(0,0,0,0.1)", zIndex: 50, overflow: "hidden" }}>
                      {/* Filter input */}
                      <div style={{ padding: "10px 12px", borderBottom: "1px solid #f0f0ee" }}>
                        <input
                          autoFocus
                          style={{ ...S.input, margin: 0 }}
                          placeholder="Filtra categorie..."
                          value={dropdownFilter}
                          onChange={e => setDropdownFilter(e.target.value)}
                        />
                      </div>
                      {/* List */}
                      <div style={{ maxHeight: 240, overflowY: "auto" }}>
                        {filteredNonTecniche.length === 0
                          ? <div style={{ padding: "12px 16px", fontSize: 13, color: "#aaa", fontStyle: "italic" }}>Nessun risultato</div>
                          : filteredNonTecniche.map(c => (
                              <button key={c.id}
                                style={{ display: "block", width: "100%", textAlign: "left", padding: "10px 16px", fontSize: 14, background: c.id === categoriaSingola ? "#eaf5ee" : "transparent", color: c.id === categoriaSingola ? "#006630" : "#333", border: "none", cursor: "pointer", fontFamily: "inherit", borderBottom: "1px solid #f5f5f3" }}
                                onMouseOver={e => { if (c.id !== categoriaSingola) e.currentTarget.style.background = "#fafaf8"; }}
                                onMouseOut={e => { if (c.id !== categoriaSingola) e.currentTarget.style.background = "transparent"; }}
                                onClick={() => { setCategoriaSingola(c.id); setDropdownOpen(false); setAttivaUtenza(null); }}
                              >
                                {c.nome}
                              </button>
                            ))
                        }
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Attivare utenza */}
              {showUtenza && (
                <div style={{ ...S.card, marginBottom: 16, animation: "fadeInForm 0.2s ease" }}>
                  <div style={sectionLabel}>Attivare utenza?</div>
                  <p style={{ fontSize: 13, color: "#888", marginBottom: 12 }}>Il fornitore riceverà un invito per accedere al portale.</p>
                  <div style={{ display: "flex", gap: 12 }}>
                    <button style={choiceBtn(attivaUtenza === "si")} onClick={() => setAttivaUtenza("si")}>Sì</button>
                    <button style={choiceBtn(attivaUtenza === "no")} onClick={() => setAttivaUtenza("no")}>No</button>
                  </div>
                </div>
              )}
            </>
          )}

          {/* ── Tecnico route ── */}
          {tecnico === "tecnico" && (
            <div style={{ ...S.card, marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <div style={sectionLabel}>Categorie commerciali</div>
                <button style={{ ...S.btnSecondary, padding: "6px 16px", fontSize: 13 }} onClick={() => { setShowModal(true); setModalFilter(""); }}>
                  + Aggiungi categoria
                </button>
              </div>

              {/* Selected categories list */}
              {categorieSelezionate.length === 0
                ? <p style={{ fontSize: 13, color: "#aaa", fontStyle: "italic" }}>Nessuna categoria aggiunta.</p>
                : <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {categorieSelezionate.map(c => (
                      <div key={c.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", borderRadius: 8, background: "#eaf5ee", border: "1px solid #cce4d3" }}>
                        <span style={{ fontSize: 14, color: "#1a1a1a", fontWeight: 500 }}>{c.nome}</span>
                        <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, color: "#842029", fontFamily: "inherit", padding: "2px 8px" }} onClick={() => removeCategoria(c.id)}>Rimuovi</button>
                      </div>
                    ))}
                  </div>
              }

              {/* Utenza note */}
              {categorieSelezionate.length > 0 && (
                <div style={{ marginTop: 14, padding: "10px 14px", borderRadius: 8, background: "#f0faf4", border: "1px solid #cce4d3" }}>
                  <p style={{ fontSize: 13, color: "#006630", margin: 0 }}>✓ L'utenza verrà attivata automaticamente per i fornitori tecnici.</p>
                </div>
              )}
            </div>
          )}

        </div>
      )}

      {/* ── Submit ── */}
      {showSubmit && (
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
          <button
            style={{ ...S.btnPrimary, padding: "11px 32px" }}
            onMouseOver={e => e.target.style.background = "#007236"}
            onMouseOut={e => e.target.style.background = "#00833E"}
            onClick={onComplete}
          >
            Crea fornitore
          </button>
        </div>
      )}

      {/* ── Tecnico modal — Aggiungi categoria ── */}
      {showModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }} onClick={() => setShowModal(false)}>
          <div style={{ background: "#fff", borderRadius: 12, padding: "28px 32px", width: 520, maxWidth: "90vw", maxHeight: "80vh", display: "flex", flexDirection: "column", fontFamily: "'DM Sans',sans-serif" }} onClick={e => e.stopPropagation()}>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1a1a1a", margin: 0 }}>Aggiungi categoria commerciale</h2>
              <button style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "#888" }} onClick={() => setShowModal(false)}>✕</button>
            </div>
            {/* Filter */}
            <div style={{ marginBottom: 12 }}>
              <input
                autoFocus
                style={S.input}
                placeholder="Filtra categorie..."
                value={modalFilter}
                onChange={e => setModalFilter(e.target.value)}
              />
            </div>
            {/* List */}
            <div style={{ flex: 1, overflowY: "auto" }}>
              {filteredTecniche.length === 0
                ? <p style={{ fontSize: 13, color: "#aaa", fontStyle: "italic", padding: "8px 0" }}>Nessuna categoria disponibile.</p>
                : filteredTecniche.map(c => (
                    <button key={c.id}
                      style={{ display: "block", width: "100%", textAlign: "left", padding: "11px 14px", fontSize: 14, background: "transparent", color: "#333", border: "none", borderBottom: "1px solid #f0f0ee", cursor: "pointer", fontFamily: "inherit" }}
                      onMouseOver={e => e.currentTarget.style.background = "#fafaf8"}
                      onMouseOut={e => e.currentTarget.style.background = "transparent"}
                      onClick={() => { addCategoria(c); setModalFilter(""); }}
                    >
                      {c.nome}
                    </button>
                  ))
              }
            </div>
            {/* Footer */}
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
              <button style={S.btnGhost} onClick={() => setShowModal(false)}>Chiudi</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// ─── B2 Fornitori ────────────────────────────────────────────────────
const categoriaTag = (stato) => {
  const map = {
    verde:  { bg: "#e6f4ed", color: "#006630", border: "#b2dfcc" },
    giallo: { bg: "#FFF3CD", color: "#856404", border: "#FFE69C" },
    rosso:  { bg: "#F8D7DA", color: "#842029", border: "#F5C2C7" },
  };
  const s = map[stato] || { bg: "#f0f0f0", color: "#555", border: "#ddd" };
  return { display: "inline-block", padding: "2px 8px", borderRadius: 20, fontSize: 11, fontWeight: 500,
    background: s.bg, color: s.color, border: `1px solid ${s.border}`, whiteSpace: "nowrap" };
};

function FornitoriPage({ onOpenScheda, onNuovoFornitore }) {
  const [search, setSearch] = useState("");
  const [filterProfilo, setFilterProfilo] = useState("");
  const [filterTipo, setFilterTipo] = useState("");
  const [filterCategoria, setFilterCategoria] = useState("");
  const [sortCol, setSortCol] = useState(null);
  const [sortDir, setSortDir] = useState("asc");

  const toggleSort = (col) => {
    if (sortCol === col) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortCol(col); setSortDir("asc"); }
  };

  let data = SUPPLIERS.filter(s => {
    const matchName      = !search          || s.name.toLowerCase().includes(search.toLowerCase());
    const matchProfilo   = !filterProfilo   || s.profilo === filterProfilo;
    const matchTipo      = !filterTipo      || s.tipo === filterTipo;
    const matchCategoria = !filterCategoria || s.categorie.some(c => c.nome.toLowerCase().includes(filterCategoria.toLowerCase()));
    return matchName && matchProfilo && matchTipo && matchCategoria;
  });
  if (sortCol) {
    data = [...data].sort((a, b) => {
      const va = a[sortCol] || "";
      const vb = b[sortCol] || "";
      return sortDir === "asc" ? va.localeCompare(vb) : vb.localeCompare(va);
    });
  }

  const SortIndicator = ({ col }) => sortCol === col ? <span style={{ marginLeft: 4, fontSize: 10 }}>{sortDir === "asc" ? "▲" : "▼"}</span> : null;

  const sel = (w) => ({ ...S.input, width: w, padding: "8px 10px" });

  return (
    <div>
      <h1 style={S.h1}>Fornitori</h1>
      <p style={S.subtitle}>Elenco completo dei fornitori registrati</p>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <select style={sel(110)} value={filterProfilo} onChange={e => setFilterProfilo(e.target.value)}>
            <option value="">Profilo</option>
            <option value="prof">Professionista</option>
            <option value="soc">Società</option>
            <option value="montana">Montana</option>
          </select>
          <select style={sel(90)} value={filterTipo} onChange={e => setFilterTipo(e.target.value)}>
            <option value="">Tipo</option>
            <option value="T">T</option>
            <option value="NT">NT</option>
          </select>
          <input style={sel(200)} placeholder="Fornitore..." value={search} onChange={e => setSearch(e.target.value)} />
          <input style={sel(180)} placeholder="Categoria..." value={filterCategoria} onChange={e => setFilterCategoria(e.target.value)} />
        </div>
        <button style={S.btnPrimary} onClick={onNuovoFornitore}>Nuovo fornitore</button>
      </div>
      <div style={{ ...S.card, overflowX: "auto" }}>
        <table style={S.table}>
          <thead>
            <tr>
              <th style={S.th}>Profilo</th>
              <th style={S.th}>Tipo</th>
              <th style={S.th} onClick={() => toggleSort("name")}>Nome / Ragione Sociale<SortIndicator col="name" /></th>
              <th style={S.th}>Categorie</th>
              <th style={{ ...S.th, width: 60 }}>Val</th>
              <th style={S.th}>Azioni</th>
            </tr>
          </thead>
          <tbody>
            {data.map(s => (
              <tr key={s.id} style={{ cursor: "default" }}
                onMouseOver={e => e.currentTarget.querySelectorAll("td").forEach(td => td.style.background = "#fafaf8")}
                onMouseOut={e => e.currentTarget.querySelectorAll("td").forEach(td => td.style.background = "")}>
                <td style={S.td}><ProfiloIcon profilo={s.profilo} /></td>
                <td style={S.td}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: s.tipo === "T" ? "#3b6db5" : "#6b3fa0",
                    background: s.tipo === "T" ? "#e8f0fe" : "#f0ebff",
                    border: `1px solid ${s.tipo === "T" ? "#c4d7f2" : "#d4bbf7"}`,
                    borderRadius: 4, padding: "2px 7px" }}>{s.tipo}</span>
                </td>
                <td style={{ ...S.td, fontWeight: 500 }}>{s.name}</td>
                <td style={S.td}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                    {s.categorie.map((c, i) => (
                      <span key={i} style={categoriaTag(c.stato)}>{c.nome}</span>
                    ))}
                  </div>
                </td>
                <td style={{ ...S.td, color: s.val === "N/D" ? "#aaa" : "#333", fontWeight: 500, fontSize: 13 }}>{s.val}</td>
                <td style={S.td}><button style={{ ...S.btnSecondary, padding: "5px 12px", fontSize: 13 }} onClick={() => onOpenScheda(s)}>Vedi scheda →</button></td>
              </tr>
            ))}
            {data.length === 0 && <tr><td colSpan={6} style={{ ...S.td, textAlign: "center", color: "#aaa", padding: 32 }}>Nessun fornitore trovato</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Categorie Commerciali ───────────────────────────────────────────
function CategorieCommercialiPage({ onOpenDetail }) {
  const [search, setSearch] = useState("");
  const [filterTipologia, setFilterTipologia] = useState("");
  const [filterApplicabile, setFilterApplicabile] = useState("");

  const tipologiaBadge = (tip) => {
    const map = {
      "Tecnica":      { bg: "#f0ebff", color: "#6b3fa0", border: "#d4bbf7" },
      "Non tecnica":  { bg: "#e8f0fe", color: "#3b6db5", border: "#c4d7f2" },
    };
    const s = map[tip] || { bg: "#f0f0f0", color: "#555", border: "#ddd" };
    return { display: "inline-block", padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 500,
      background: s.bg, color: s.color, border: `1px solid ${s.border}`, whiteSpace: "nowrap" };
  };

  let data = CATEGORIE_COMMERCIALI.filter(c => {
    const matchSearch      = !search           || c.nome.toLowerCase().includes(search.toLowerCase());
    const matchTipologia   = !filterTipologia  || c.tipologia === filterTipologia;
    const matchApplicabile = !filterApplicabile || c.applicabile === filterApplicabile || c.applicabile === "Entrambi";
    return matchSearch && matchTipologia && matchApplicabile;
  });

  return (
    <div>
      <h1 style={S.h1}>Categorie Commerciali</h1>
      <p style={S.subtitle}>Gestione delle categorie commerciali e dei relativi requisiti</p>

      {/* Filters */}
      <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
        <input
          style={{ ...S.input, maxWidth: 280 }}
          placeholder="Cerca categoria..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          style={{ ...S.input, maxWidth: 200, color: filterTipologia ? "#333" : "#888" }}
          value={filterTipologia}
          onChange={e => setFilterTipologia(e.target.value)}
        >
          <option value="">Tipologia: Tutte</option>
          <option value="Tecnica">Tecnica</option>
          <option value="Non tecnica">Non tecnica</option>
        </select>
        <select
          style={{ ...S.input, maxWidth: 200, color: filterApplicabile ? "#333" : "#888" }}
          value={filterApplicabile}
          onChange={e => setFilterApplicabile(e.target.value)}
        >
          <option value="">Applicabile a: Tutti</option>
          <option value="Professionista">Professionista</option>
          <option value="Società">Società</option>
        </select>
      </div>

      {/* Table */}
      <div style={{ ...S.card, overflowX: "auto" }}>
        <table style={{ ...S.table, minWidth: 500 }}>
          <thead>
            <tr>
              <th style={S.th}>Nome</th>
              <th style={S.th}>Tipologia</th>
              <th style={S.th}>Applicabile a</th>
              <th style={S.th}></th>
            </tr>
          </thead>
          <tbody>
            {data.map(c => (
              <tr key={c.id}
                onMouseOver={e => e.currentTarget.querySelectorAll("td").forEach(td => td.style.background = "#fafaf8")}
                onMouseOut={e => e.currentTarget.querySelectorAll("td").forEach(td => td.style.background = "")}>
                <td style={{ ...S.td, fontWeight: 500 }}>{c.nome}</td>
                <td style={S.td}><span style={tipologiaBadge(c.tipologia)}>{c.tipologia}</span></td>
                <td style={{ ...S.td, fontSize: 13, color: "#888" }}>{c.applicabile}</td>
                <td style={S.td}>
                  <button style={{ ...S.btnSecondary, padding: "5px 12px", fontSize: 13 }} onClick={() => onOpenDetail(c)}>
                    Gestisci →
                  </button>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr><td colSpan={4} style={{ ...S.td, textAlign: "center", color: "#aaa", padding: 32 }}>Nessuna categoria trovata</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── B3 Qualifiche ───────────────────────────────────────────────────
function QualifichePage({ onOpenDetail }) {
  const [search, setSearch] = useState("");
  const [filterApplies, setFilterApplies] = useState("");
  const [filterCategoria, setFilterCategoria] = useState("");

  let data = QUALIFICHE.filter(q => {
    const matchSearch = q.name.toLowerCase().includes(search.toLowerCase());
    const matchApplies = !filterApplies || q.applies === filterApplies || q.applies === "Entrambi";
    const matchCategoria = !filterCategoria || q.categoria === filterCategoria;
    return matchSearch && matchApplies && matchCategoria;
  });

  const categoriaBadge = (cat) => {
    const map = {
      "Anagrafica": { bg: "#e8f0fe", color: "#3b6db5", border: "#c4d7f2" },
      "Amministrativa": { bg: "#f0ebff", color: "#6b3fa0", border: "#d4bbf7" },
      "Tecnica":        { bg: "#f0f0f0", color: "#555555", border: "#d0d0d0" },
    };
    const s = map[cat] || { bg: "#f0f0f0", color: "#555", border: "#ddd" };
    return { display: "inline-block", padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 500, background: s.bg, color: s.color, border: `1px solid ${s.border}`, whiteSpace: "nowrap" };
  };

  return (
    <div>
      <h1 style={S.h1}>Schede di qualifica (Legacy)</h1>
      <p style={S.subtitle}>Catalogo qualifiche e monitoraggio utilizzo</p>
      <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
        <input style={{ ...S.input, maxWidth: 280 }} placeholder="Cerca qualifica..." value={search} onChange={e => setSearch(e.target.value)} />
        <select style={{ ...S.input, maxWidth: 200, color: filterCategoria ? "#333" : "#888" }} value={filterCategoria} onChange={e => setFilterCategoria(e.target.value)}>
          <option value="">Categoria: Tutte</option>
          <option value="Anagrafica">Anagrafica</option>
          <option value="Amministrativa">Amministrativa</option>
          <option value="Tecnica">Tecnica</option>
        </select>
        <select style={{ ...S.input, maxWidth: 200, color: filterApplies ? "#333" : "#888" }} value={filterApplies} onChange={e => setFilterApplies(e.target.value)}>
          <option value="">Applicabile a: Tutti</option>
          <option value="Professionista">Professionista</option>
          <option value="Società">Società</option>
        </select>
      </div>
      <div style={{ ...S.card, overflowX: "auto" }}>
        <table style={{ ...S.table, minWidth: 500 }}>
          <thead>
            <tr>
              <th style={S.th}>Qualifica</th>
              <th style={S.th}>Categoria</th>
              <th style={S.th}>Applicabile a</th>
              <th style={S.th}>Azioni</th>
            </tr>
          </thead>
          <tbody>
            {data.map(q => (
              <tr key={q.id} onMouseOver={e => e.currentTarget.querySelectorAll("td").forEach(td => td.style.background = "#fafaf8")} onMouseOut={e => e.currentTarget.querySelectorAll("td").forEach(td => td.style.background = "")}>
                <td style={{ ...S.td, fontWeight: 500 }}>{q.name}</td>
                <td style={S.td}><span style={categoriaBadge(q.categoria)}>{q.categoria}</span></td>
                <td style={{ ...S.td, fontSize: 13, color: "#888" }}>{q.applies}</td>
                <td style={S.td}><button style={{ ...S.btnSecondary, padding: "5px 12px", fontSize: 13 }} onClick={() => onOpenDetail(q)}>Gestisci →</button></td>
              </tr>
            ))}
            {data.length === 0 && <tr><td colSpan={4} style={{ ...S.td, textAlign: "center", color: "#aaa", padding: 32 }}>Nessuna qualifica trovata</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Dashboard ───────────────────────────────────────────────────────
const CATEGORIE = ["Anagrafica", "Amministrativa", "Tecnica"];
const STATI_DASHBOARD = ["Incompleto", "Da revisionare", "Richiesta di accesso"];

function RichiestePage({ onOpenScheda }) {
  const [sortCol, setSortCol] = useState(null);
  const [sortDir, setSortDir] = useState("asc");
  const [searchFornitore, setSearchFornitore] = useState("");
  const [searchQualifica, setSearchQualifica] = useState("");
  const [filterCategoria, setFilterCategoria] = useState("");
  const [filterStato, setFilterStato] = useState("");

  const toggleSort = (col) => {
    if (sortCol === col) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortCol(col); setSortDir("asc"); }
  };

  let data = RICHIESTE.filter(r => {
    const matchFornitore = !searchFornitore || r.fornitore.toLowerCase().includes(searchFornitore.toLowerCase());
    const matchQualifica = !searchQualifica || r.qualifica.toLowerCase().includes(searchQualifica.toLowerCase());
    const matchCategoria = !filterCategoria || r.categoria === filterCategoria;
    const matchStato     = !filterStato     || r.stato === filterStato;
    return matchFornitore && matchQualifica && matchCategoria && matchStato;
  });

  if (sortCol) {
    data = [...data].sort((a, b) => {
      const va = a[sortCol] || "";
      const vb = b[sortCol] || "";
      return sortDir === "asc" ? va.localeCompare(vb) : vb.localeCompare(va);
    });
  }

  const SortIndicator = ({ col }) => sortCol === col
    ? <span style={{ marginLeft: 4, fontSize: 10 }}>{sortDir === "asc" ? "▲" : "▼"}</span>
    : null;

  const thC = { ...S.th, padding: "10px 12px", fontSize: 12 };
  const tdC = { ...S.td, padding: "11px 12px", fontSize: 14 };

  const categoriaBadge = (cat) => {
    const map = {
      "Anagrafica":     { bg: "#e8f0fe", color: "#3b6db5", border: "#c4d7f2" },
      "Amministrativa": { bg: "#f0ebff", color: "#6b3fa0", border: "#d4bbf7" },
      "Tecnica":        { bg: "#f0f0f0", color: "#555555", border: "#d0d0d0" },
    };
    const s = map[cat] || { bg: "#f0f0f0", color: "#555", border: "#ddd" };
    return { display: "inline-block", padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 500,
      background: s.bg, color: s.color, border: `1px solid ${s.border}`, whiteSpace: "nowrap" };
  };

  const statoBadgeStyle = (stato) => {
    if (stato === "Da revisionare")      return statusBadge("In revisione");  // yellow
    if (stato === "Richiesta di accesso") return statusBadge("In revisione"); // yellow
    return statusBadge("Sospeso");                                             // red
  };

  return (
    <div>
      <h1 style={S.h1}>Dashboard</h1>
      <p style={S.subtitle}>Elenco completo delle qualifiche in lavorazione</p>

      {/* Filters */}
      <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
        <input
          style={{ ...S.input, maxWidth: 200 }}
          placeholder="Cerca fornitore..."
          value={searchFornitore}
          onChange={e => setSearchFornitore(e.target.value)}
        />
        <input
          style={{ ...S.input, maxWidth: 200 }}
          placeholder="Cerca qualifica..."
          value={searchQualifica}
          onChange={e => setSearchQualifica(e.target.value)}
        />
        <select
          style={{ ...S.input, maxWidth: 180, color: filterCategoria ? "#333" : "#888" }}
          value={filterCategoria}
          onChange={e => setFilterCategoria(e.target.value)}
        >
          <option value="">Categoria: Tutte</option>
          {CATEGORIE.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select
          style={{ ...S.input, maxWidth: 180, color: filterStato ? "#333" : "#888" }}
          value={filterStato}
          onChange={e => setFilterStato(e.target.value)}
        >
          <option value="">Tipo: Tutti</option>
          {STATI_DASHBOARD.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {/* Table */}
      <div style={{ ...S.card, overflowX: "auto" }}>
        <table style={{ ...S.table, minWidth: 700 }}>
          <thead>
            <tr>
              <th style={thC} onClick={() => toggleSort("fornitore")}>Fornitore<SortIndicator col="fornitore" /></th>
              <th style={thC} onClick={() => toggleSort("qualifica")}>Qualifica<SortIndicator col="qualifica" /></th>
              <th style={thC} onClick={() => toggleSort("categoria")}>Categoria<SortIndicator col="categoria" /></th>
              <th style={{ ...thC, width: 100 }} onClick={() => toggleSort("data")}>Data<SortIndicator col="data" /></th>
              <th style={thC} onClick={() => toggleSort("stato")}>Tipo<SortIndicator col="stato" /></th>
              <th style={{ ...thC, width: 80 }}></th>
            </tr>
          </thead>
          <tbody>
            {data.map(r => (
              <tr key={r.id}
                onMouseOver={e => e.currentTarget.querySelectorAll("td").forEach(td => td.style.background = "#fafaf8")}
                onMouseOut={e => e.currentTarget.querySelectorAll("td").forEach(td => td.style.background = "")}>
                <td style={{ ...tdC, fontWeight: 500 }}>{r.fornitore}</td>
                <td style={tdC}>{r.qualifica}</td>
                <td style={tdC}><span style={categoriaBadge(r.categoria)}>{r.categoria}</span></td>
                <td style={{ ...tdC, color: "#888", whiteSpace: "nowrap" }}>{r.data}</td>
                <td style={tdC}><span style={statoBadgeStyle(r.stato)}>{r.stato}</span></td>
                <td style={tdC}>
                  <button
                    style={{ ...S.btnSecondary, padding: "4px 10px", fontSize: 12 }}
                    onClick={() => onOpenScheda({ name: r.fornitore, type: "prof" })}
                  >
                    Vedi →
                  </button>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr><td colSpan={6} style={{ ...tdC, textAlign: "center", color: "#aaa", padding: 32 }}>Nessun risultato trovato</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Qualifica Detail Page ────────────────────────────────────────────
const QUALIFICA_REQUISITI = [
  { type: "personale", label: "Tecnico abilitato", desc: "Professionista iscritto all'albo con esperienza documentata nel settore" },
  { type: "documento", label: "Attestazione / certificato in corso di validità", desc: "Rilasciato da organismo accreditato" },
  { type: "documento", label: "Dichiarazione sostitutiva di atto notorio", desc: "Firmata dal legale rappresentante" },
  { type: "documento", label: "Polizza RC professionale", desc: "Con massimale minimo adeguato alla classifica" },
];

const QUALIFICA_CERTIFICATI_MOCK = [
  { id: 1, name: "Rossi & Partners S.r.l.", type: "soc", data: "15/01/2025", stato: "Attiva" },
  { id: 2, name: "GreenWorks S.r.l.", type: "soc", data: "03/06/2024", stato: "Attiva" },
  { id: 3, name: "Marco Bianchi", type: "prof", data: "20/09/2023", stato: "Scaduta" },
  { id: 4, name: "Anna Colombo", type: "prof", data: "12/03/2025", stato: "Attiva" },
  { id: 5, name: "Edilizia Moderna S.p.A.", type: "soc", data: "01/11/2024", stato: "Attiva" },
];

const QUALIFICA_ABILITABILI_INIT = [
  { id: 1, name: "TechBuild S.p.A.", type: "soc", statoQualifica: "Da revisionare" },
  { id: 2, name: "Giulia Ferri",     type: "prof", statoQualifica: "Incompleto" },
  { id: 3, name: "Luca Moretti",     type: "prof", statoQualifica: "Da revisionare" },
  { id: 4, name: "GreenWorks S.r.l.",type: "soc", statoQualifica: "Incompleto" },
];

function QualificaDetailPage({ qualifica, showToast, onOpenScheda }) {
  const [tab, setTab] = useState("certificati");

  // Tab 1 filters
  const [searchFornitore, setSearchFornitore] = useState("");
  const [filterTipo, setFilterTipo] = useState("");

  // Tab 2 state
  const [abilitabili] = useState(QUALIFICA_ABILITABILI_INIT);
  const [searchCert2, setSearchCert2] = useState("");
  const [filterTipo2, setFilterTipo2] = useState("");

  // Tab 3 state
  const [nuoveAggiunte, setNuoveAggiunte] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [modalSearch3, setModalSearch3] = useState("");
  const [modalFilterTipo3, setModalFilterTipo3] = useState("");
  const [pendingIds, setPendingIds] = useState(new Set());
  const [searchNuove, setSearchNuove] = useState("");
  const [filterTipoNuove, setFilterTipoNuove] = useState("");
  const [richiesteAccesso, setRichiesteAccesso] = useState([
    { id: 1, name: "Marco Bianchi", type: "prof", data: "2025-04-11" },
  ]);

  const filteredCertificati = QUALIFICA_CERTIFICATI_MOCK.filter(s => {
    const matchName = !searchFornitore || s.name.toLowerCase().includes(searchFornitore.toLowerCase());
    const matchTipo = !filterTipo || s.type === filterTipo;
    return matchName && matchTipo;
  });

  return (
    <div>
      {/* Requisiti */}
      <div style={S.card}>
        <h3 style={S.h3}>Requisiti</h3>
        <p style={{ fontSize: 13, color: "#888", marginBottom: 16 }}>Requisiti necessari per ottenere questa qualifica.</p>
        {QUALIFICA_REQUISITI.map((r, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "12px 0", borderBottom: i < QUALIFICA_REQUISITI.length - 1 ? "1px solid #f0f0ee" : "none" }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: r.type === "personale" ? "#e8f0fe" : "#FFF3CD", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 13, marginTop: 2 }}>
              {r.type === "personale" ? "👤" : "📄"}
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 500, color: "#333" }}>{r.label}</div>
              <div style={{ fontSize: 13, color: "#888", marginTop: 2 }}>{r.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", borderBottom: "1px solid #e8e8e5", marginBottom: 20 }}>
        <button style={S.tab(tab === "certificati")} onClick={() => setTab("certificati")}>Fornitori certificati</button>
        <button style={S.tab(tab === "certificazione")} onClick={() => setTab("certificazione")}>Fornitori in certificazione</button>
        <button style={S.tab(tab === "richieste")} onClick={() => setTab("richieste")}>Gestione accesso alla qualifica</button>
      </div>

      {/* Tab 1 — Fornitori certificati */}
      {tab === "certificati" && (
        <div style={S.card}>
          {/* Filters */}
          <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
            <select
              style={{ ...S.input, maxWidth: 200, color: filterTipo ? "#333" : "#888" }}
              value={filterTipo}
              onChange={e => setFilterTipo(e.target.value)}
            >
              <option value="">Tipo: Tutti</option>
              <option value="prof">Professionista</option>
              <option value="soc">Società</option>
            </select>
            <input
              style={{ ...S.input, maxWidth: 240 }}
              placeholder="Cerca fornitore..."
              value={searchFornitore}
              onChange={e => setSearchFornitore(e.target.value)}
            />
          </div>
          {filteredCertificati.length === 0
            ? <p style={{ color: "#888", fontSize: 14, fontStyle: "italic" }}>Nessun fornitore trovato.</p>
            : <table style={S.table}>
                <thead><tr>
                  <th style={S.th}>Tipo</th>
                  <th style={S.th}>Fornitore</th>
                  <th style={S.th}>Data certificazione</th>
                  <th style={S.th}>Azioni</th>
                </tr></thead>
                <tbody>
                  {filteredCertificati.map(s => (
                    <tr key={s.id} onMouseOver={e => e.currentTarget.querySelectorAll("td").forEach(td => td.style.background = "#fafaf8")} onMouseOut={e => e.currentTarget.querySelectorAll("td").forEach(td => td.style.background = "")}>
                      <td style={S.td}><TypeIcon type={s.type} /></td>
                      <td style={{ ...S.td, fontWeight: 500 }}>{s.name}</td>
                      <td style={{ ...S.td, color: "#888" }}>{s.data}</td>
                      <td style={S.td}>
                        <button
                          style={{ ...S.btnSecondary, padding: "5px 12px", fontSize: 13 }}
                          onClick={() => onOpenScheda({ name: s.name, type: s.type })}
                        >Vedi scheda →</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
          }
        </div>
      )}

      {/* Tab 2 — Fornitori in certificazione */}
      {tab === "certificazione" && (
        <div style={S.card}>
          <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
            <select
              style={{ ...S.input, maxWidth: 200, color: filterTipo2 ? "#333" : "#888" }}
              value={filterTipo2}
              onChange={e => setFilterTipo2(e.target.value)}
            >
              <option value="">Tipo: Tutti</option>
              <option value="prof">Professionista</option>
              <option value="soc">Società</option>
            </select>
            <input
              style={{ ...S.input, maxWidth: 240 }}
              placeholder="Cerca fornitore..."
              value={searchCert2}
              onChange={e => setSearchCert2(e.target.value)}
            />
          </div>
          {(() => {
            const filtered = abilitabili.filter(s =>
              (!searchCert2 || s.name.toLowerCase().includes(searchCert2.toLowerCase())) &&
              (!filterTipo2 || s.type === filterTipo2)
            );
            return filtered.length === 0
              ? <p style={{ color: "#888", fontSize: 14, fontStyle: "italic" }}>Nessun fornitore trovato.</p>
              : <table style={S.table}>
                  <thead><tr>
                    <th style={S.th}>Tipo</th>
                    <th style={S.th}>Fornitore</th>
                    <th style={S.th}>Stato qualifica</th>
                    <th style={S.th}>Azioni</th>
                  </tr></thead>
                  <tbody>
                    {filtered.map(s => (
                      <tr key={s.id} onMouseOver={e => e.currentTarget.querySelectorAll("td").forEach(td => td.style.background = "#fafaf8")} onMouseOut={e => e.currentTarget.querySelectorAll("td").forEach(td => td.style.background = "")}>
                        <td style={S.td}><TypeIcon type={s.type} /></td>
                        <td style={{ ...S.td, fontWeight: 500 }}>{s.name}</td>
                        <td style={S.td}>
                          <span style={s.statoQualifica === "Da revisionare" ? statusBadge("In revisione") : statusBadge("Sospeso")}>
                            {s.statoQualifica}
                          </span>
                        </td>
                        <td style={S.td}>
                          <button
                            style={{ ...S.btnSecondary, padding: "5px 12px", fontSize: 13 }}
                            onClick={() => onOpenScheda({ name: s.name, type: s.type })}
                          >Vedi scheda →</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>;
          })()}
        </div>
      )}

      {/* Tab 3 — Gestione accesso alla qualifica */}
      {tab === "richieste" && (() => {
        const filteredNuove = nuoveAggiunte.filter(s =>
          (!searchNuove || s.name.toLowerCase().includes(searchNuove.toLowerCase())) &&
          (!filterTipoNuove || s.type === filterTipoNuove)
        );
        const modalSuppliers = SUPPLIERS.filter(s =>
          (!modalSearch3 || s.name.toLowerCase().includes(modalSearch3.toLowerCase())) &&
          (!modalFilterTipo3 || s.type === modalFilterTipo3)
        );

        const handleAggiungiModal = (s) => {
          setPendingIds(prev => {
            const next = new Set(prev);
            if (next.has(s.id)) { next.delete(s.id); } else { next.add(s.id); }
            return next;
          });
        };

        const handleConfermaModal = () => {
          const toAdd = SUPPLIERS.filter(s => pendingIds.has(s.id) && !nuoveAggiunte.find(n => n.id === s.id));
          setNuoveAggiunte(prev => [...prev, ...toAdd]);
          setPendingIds(new Set());
          setShowAddModal(false);
        };

        const handleRimuoviNuova = (id) => setNuoveAggiunte(prev => prev.filter(s => s.id !== id));

        const handleRespingi = (id) => setRichiesteAccesso(prev => prev.filter(r => r.id !== id));

        const handleConfermaRichiesta = (r) => {
          if (!nuoveAggiunte.find(n => n.id === r.id)) {
            setNuoveAggiunte(prev => [...prev, { id: r.id, name: r.name, type: r.type }]);
          }
          setRichiesteAccesso(prev => prev.filter(x => x.id !== r.id));
        };

        return (
          <>
            {/* Sheet — Nuove aggiunte */}
            <div style={S.card}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <h3 style={{ ...S.h3, margin: 0 }}>Nuove aggiunte</h3>
                <button style={{ ...S.btnSecondary, padding: "6px 16px", fontSize: 13 }} onClick={() => { setShowAddModal(true); setModalSearch3(""); setModalFilterTipo3(""); setPendingIds(new Set()); }}>
                  Aggiungi fornitore
                </button>
              </div>

              {/* Filters for the nuove aggiunte table */}
              <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
                <select style={{ ...S.input, maxWidth: 200, color: filterTipoNuove ? "#333" : "#888" }} value={filterTipoNuove} onChange={e => setFilterTipoNuove(e.target.value)}>
                  <option value="">Tipo: Tutti</option>
                  <option value="prof">Professionista</option>
                  <option value="soc">Società</option>
                </select>
                <input style={{ ...S.input, maxWidth: 240 }} placeholder="Cerca fornitore..." value={searchNuove} onChange={e => setSearchNuove(e.target.value)} />
              </div>

              {filteredNuove.length === 0
                ? <p style={{ fontSize: 14, color: "#aaa", fontStyle: "italic" }}>Nessun fornitore in coda.</p>
                : <table style={S.table}>
                    <thead><tr>
                      <th style={S.th}>Tipo</th>
                      <th style={S.th}>Fornitore</th>
                      <th style={S.th}></th>
                    </tr></thead>
                    <tbody>
                      {filteredNuove.map(s => (
                        <tr key={s.id} onMouseOver={e => e.currentTarget.querySelectorAll("td").forEach(td => td.style.background = "#fafaf8")} onMouseOut={e => e.currentTarget.querySelectorAll("td").forEach(td => td.style.background = "")}>
                          <td style={S.td}><TypeIcon type={s.type} /></td>
                          <td style={{ ...S.td, fontWeight: 500 }}>{s.name}</td>
                          <td style={{ ...S.td, textAlign: "right" }}>
                            <button style={{ ...S.btnGhost, padding: "5px 14px", fontSize: 13, color: "#842029", borderColor: "#f5c2c7" }} onClick={() => handleRimuoviNuova(s.id)}>Rimuovi</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
              }

              {/* Attiva iter — bottom right */}
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
                <button style={{ ...S.btnPrimary, padding: "9px 22px" }} onMouseOver={e => e.target.style.background = "#007236"} onMouseOut={e => e.target.style.background = "#00833E"}>
                  Attiva iter
                </button>
              </div>
            </div>

            {/* Sheet — Richieste di accesso */}
            <div style={{ ...S.card, marginTop: 16 }}>
              <h3 style={{ ...S.h3, marginBottom: 16 }}>Richieste di accesso</h3>
              {richiesteAccesso.length === 0
                ? <p style={{ fontSize: 14, color: "#aaa", fontStyle: "italic" }}>Nessuna richiesta in attesa.</p>
                : <table style={S.table}>
                    <thead><tr>
                      <th style={S.th}>Tipo</th>
                      <th style={S.th}>Fornitore</th>
                      <th style={S.th}>Data</th>
                      <th style={{ ...S.th, textAlign: "right" }}>Azioni</th>
                    </tr></thead>
                    <tbody>
                      {richiesteAccesso.map(r => (
                        <tr key={r.id} onMouseOver={e => e.currentTarget.querySelectorAll("td").forEach(td => td.style.background = "#fafaf8")} onMouseOut={e => e.currentTarget.querySelectorAll("td").forEach(td => td.style.background = "")}>
                          <td style={S.td}><TypeIcon type={r.type} /></td>
                          <td style={{ ...S.td, fontWeight: 500 }}>{r.name}</td>
                          <td style={{ ...S.td, color: "#888" }}>{r.data}</td>
                          <td style={{ ...S.td, textAlign: "right" }}>
                            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                              <button style={{ ...S.btnGhost, padding: "5px 14px", fontSize: 13, color: "#842029", borderColor: "#f5c2c7" }} onClick={() => handleRespingi(r.id)}>Respingi</button>
                              <button style={{ ...S.btnPrimary, padding: "5px 14px", fontSize: 13 }} onMouseOver={e => e.target.style.background = "#007236"} onMouseOut={e => e.target.style.background = "#00833E"} onClick={() => handleConfermaRichiesta(r)}>Conferma</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
              }
            </div>

            {/* Overlay — Aggiungi fornitore */}
            {showAddModal && (
              <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }} onClick={() => setShowAddModal(false)}>
                <div style={{ background: "#fff", borderRadius: 12, padding: "28px 32px", width: 560, maxWidth: "90vw", maxHeight: "80vh", overflowY: "auto", fontFamily: "'DM Sans',sans-serif" }} onClick={e => e.stopPropagation()}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                    <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1a1a1a", margin: 0 }}>Aggiungi fornitore</h2>
                    <button style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "#888" }} onClick={() => setShowAddModal(false)}>✕</button>
                  </div>
                  {/* Modal filters */}
                  <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
                    <select style={{ ...S.input, maxWidth: 180, color: modalFilterTipo3 ? "#333" : "#888" }} value={modalFilterTipo3} onChange={e => setModalFilterTipo3(e.target.value)}>
                      <option value="">Tipo: Tutti</option>
                      <option value="prof">Professionista</option>
                      <option value="soc">Società</option>
                    </select>
                    <input style={{ ...S.input, flex: 1 }} placeholder="Cerca fornitore..." value={modalSearch3} onChange={e => setModalSearch3(e.target.value)} />
                  </div>
                  <table style={S.table}>
                    <thead><tr>
                      <th style={S.th}>Tipo</th>
                      <th style={S.th}>Nome</th>
                      <th style={{ ...S.th, width: 100 }}></th>
                    </tr></thead>
                    <tbody>
                      {modalSuppliers.map(s => {
                        const isPending = pendingIds.has(s.id);
                        const alreadyAdded = !!nuoveAggiunte.find(n => n.id === s.id);
                        return (
                          <tr key={s.id} onMouseOver={e => e.currentTarget.querySelectorAll("td").forEach(td => td.style.background = "#fafaf8")} onMouseOut={e => e.currentTarget.querySelectorAll("td").forEach(td => td.style.background = "")}>
                            <td style={S.td}><TypeIcon type={s.type} /></td>
                            <td style={{ ...S.td, fontWeight: 500 }}>{s.name}</td>
                            <td style={{ ...S.td, textAlign: "right" }}>
                              {alreadyAdded
                                ? <span style={{ fontSize: 12, color: "#aaa", fontStyle: "italic" }}>Già aggiunto</span>
                                : isPending
                                  ? <button style={{ ...S.btnGhost, padding: "4px 12px", fontSize: 12, color: "#842029", borderColor: "#f5c2c7" }} onClick={() => handleAggiungiModal(s)}>Annulla</button>
                                  : <button style={{ ...S.btnSecondary, padding: "4px 12px", fontSize: 12 }} onClick={() => handleAggiungiModal(s)}>Aggiungi</button>
                              }
                            </td>
                          </tr>
                        );
                      })}
                      {modalSuppliers.length === 0 && <tr><td colSpan={3} style={{ ...S.td, textAlign: "center", color: "#aaa", padding: 24 }}>Nessun fornitore trovato</td></tr>}
                    </tbody>
                  </table>
                  {/* Confirm button */}
                  <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20, gap: 10 }}>
                    <button style={S.btnGhost} onClick={() => setShowAddModal(false)}>Chiudi</button>
                    <button style={{ ...S.btnPrimary, padding: "9px 22px" }} onMouseOver={e => e.target.style.background = "#007236"} onMouseOut={e => e.target.style.background = "#00833E"} onClick={handleConfermaModal}>
                      Conferma
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        );
      })()}

    </div>
  );
}

// ─── Categoria Commerciale Detail Page ───────────────────────────────
// Exact copy of QualificaDetailPage — to be modified independently

const CATEGORIA_CERTIFICATI_MOCK = [
  { id: 1, name: "Rossi & Partners S.r.l.", type: "soc", data: "15/01/2025", stato: "Attiva",  valutazione: 4 },
  { id: 2, name: "GreenWorks S.r.l.",       type: "soc", data: "03/06/2024", stato: "Attiva",  valutazione: 5 },
  { id: 3, name: "Marco Bianchi",           type: "prof", data: "20/09/2023", stato: "Scaduta", valutazione: 3 },
  { id: 4, name: "Anna Colombo",            type: "prof", data: "12/03/2025", stato: "Attiva",  valutazione: 4 },
  { id: 5, name: "Edilizia Moderna S.p.A.", type: "soc", data: "01/11/2024", stato: "Attiva",  valutazione: 2 },
];

const CATEGORIA_ABILITABILI_INIT = [
  { id: 1, name: "TechBuild S.p.A.", type: "soc", statoQualifica: "Da revisionare" },
  { id: 2, name: "Giulia Ferri",     type: "prof", statoQualifica: "Incompleto" },
  { id: 3, name: "Luca Moretti",     type: "prof", statoQualifica: "Da revisionare" },
  { id: 4, name: "GreenWorks S.r.l.",type: "soc", statoQualifica: "Incompleto" },
];

function CategoriaCommercialeDetailPage({ categoria, showToast, onOpenScheda }) {
  const [tab, setTab] = useState("certificati");

  // Tab 1 filters
  const [searchFornitore, setSearchFornitore] = useState("");
  const [filterTipo, setFilterTipo] = useState("");

  // Tab 2 state
  const [abilitabili] = useState(CATEGORIA_ABILITABILI_INIT);
  const [searchCert2, setSearchCert2] = useState("");
  const [filterTipo2, setFilterTipo2] = useState("");

  // Tab 3 state
  const [nuoveAggiunte, setNuoveAggiunte] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [modalSearch3, setModalSearch3] = useState("");
  const [modalFilterTipo3, setModalFilterTipo3] = useState("");
  const [pendingIds, setPendingIds] = useState(new Set());
  const [searchNuove, setSearchNuove] = useState("");
  const [filterTipoNuove, setFilterTipoNuove] = useState("");
  const [richiesteAccesso, setRichiesteAccesso] = useState([
    { id: 1, name: "Marco Bianchi", type: "prof", data: "2025-04-11" },
  ]);

  const isTecnica = categoria.tipologia === "Tecnica";

  // If non-tecnica and somehow on the richieste tab, fall back to certificati
  const activeTab = (!isTecnica && tab === "richieste") ? "certificati" : tab;

  const filteredCertificati = CATEGORIA_CERTIFICATI_MOCK.filter(s => {
    const matchName = !searchFornitore || s.name.toLowerCase().includes(searchFornitore.toLowerCase());
    const matchTipo = !filterTipo || s.type === filterTipo;
    return matchName && matchTipo;
  });

  return (
    <div>
      {/* Requisiti di qualifica */}
      <div style={S.card}>
        <h3 style={S.h3}>Requisiti di qualifica</h3>
        <p style={{ fontSize: 13, color: "#888", marginBottom: 16 }}>Requisiti necessari per ottenere questa categoria commerciale.</p>

        {/* Row helper */}
        {(() => {
          const Row = ({ icon, bg, label, desc, borderBottom }) => (
            <div style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "12px 0", borderBottom: borderBottom ? "1px solid #f0f0ee" : "none" }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 13, marginTop: 2 }}>
                {icon}
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 500, color: "#333" }}>{label}</div>
                {desc && <div style={{ fontSize: 13, color: "#888", marginTop: 2 }}>{desc}</div>}
              </div>
            </div>
          );

          const SubField = ({ label }) => (
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 0 5px 40px" }}>
              <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#ccc", flexShrink: 0 }} />
              <span style={{ fontSize: 13, color: "#555" }}>{label}</span>
            </div>
          );

          return (
            <>
              {/* Anagrafica */}
              <Row icon="👤" bg="#e8f0fe" label="Qualifica Anagrafica" desc="Qualifica anagrafica standard" borderBottom />

              {/* Amministrativa */}
              <Row icon="📄" bg="#FFF3CD" label="Qualifica Amministrativa" desc="Qualifica amministrativa standard" borderBottom={categoria.tipologia === "Tecnica"} />

              {/* Technical section — Tecnica only */}
              {categoria.tipologia === "Tecnica" && <>
                <Row icon="⚙️" bg="#eaf5ee" label={`Qualifica ${categoria.nome}`} desc={null} borderBottom={false} />
                <SubField label="Ordine di iscrizione" />
                <SubField label="Regione" />
                <SubField label="N. di iscrizione" />
                <SubField label="Data di iscrizione" />
                <SubField label="In regola con CFP obbligatori" />
              </>}
            </>
          );
        })()}
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", borderBottom: "1px solid #e8e8e5", marginBottom: 20 }}>
        <button style={S.tab(activeTab === "certificati")} onClick={() => setTab("certificati")}>Fornitori qualificati</button>
        <button style={S.tab(activeTab === "certificazione")} onClick={() => setTab("certificazione")}>Fornitori in fase di qualifica</button>
        {isTecnica && <button style={S.tab(activeTab === "richieste")} onClick={() => setTab("richieste")}>Gestione accesso alla categoria commerciale</button>}
      </div>

      {/* Tab 1 — Fornitori qualificati */}
      {activeTab === "certificati" && (
        <div style={S.card}>
          <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
            <select
              style={{ ...S.input, maxWidth: 200, color: filterTipo ? "#333" : "#888" }}
              value={filterTipo}
              onChange={e => setFilterTipo(e.target.value)}
            >
              <option value="">Tipo: Tutti</option>
              <option value="prof">Professionista</option>
              <option value="soc">Società</option>
            </select>
            <input
              style={{ ...S.input, maxWidth: 240 }}
              placeholder="Cerca fornitore..."
              value={searchFornitore}
              onChange={e => setSearchFornitore(e.target.value)}
            />
          </div>
          {filteredCertificati.length === 0
            ? <p style={{ color: "#888", fontSize: 14, fontStyle: "italic" }}>Nessun fornitore trovato.</p>
            : <table style={S.table}>
                <thead><tr>
                  <th style={S.th}>Tipo</th>
                  <th style={S.th}>Fornitore</th>
                  <th style={S.th}>Valutazione</th>
                  <th style={S.th}>Data certificazione</th>
                  <th style={S.th}>Azioni</th>
                </tr></thead>
                <tbody>
                  {filteredCertificati.map(s => (
                    <tr key={s.id} onMouseOver={e => e.currentTarget.querySelectorAll("td").forEach(td => td.style.background = "#fafaf8")} onMouseOut={e => e.currentTarget.querySelectorAll("td").forEach(td => td.style.background = "")}>
                      <td style={S.td}><TypeIcon type={s.type} /></td>
                      <td style={{ ...S.td, fontWeight: 500 }}>{s.name}</td>
                      <td style={S.td}><StarDisplay value={s.valutazione} /></td>
                      <td style={{ ...S.td, color: "#888" }}>{s.data}</td>
                      <td style={S.td}>
                        <button
                          style={{ ...S.btnSecondary, padding: "5px 12px", fontSize: 13 }}
                          onClick={() => onOpenScheda({ name: s.name, type: s.type })}
                        >Vedi scheda →</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
          }
        </div>
      )}

      {/* Tab 2 — Fornitori in fase di qualifica */}
      {activeTab === "certificazione" && (
        <div style={S.card}>
          <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
            <select
              style={{ ...S.input, maxWidth: 200, color: filterTipo2 ? "#333" : "#888" }}
              value={filterTipo2}
              onChange={e => setFilterTipo2(e.target.value)}
            >
              <option value="">Tipo: Tutti</option>
              <option value="prof">Professionista</option>
              <option value="soc">Società</option>
            </select>
            <input
              style={{ ...S.input, maxWidth: 240 }}
              placeholder="Cerca fornitore..."
              value={searchCert2}
              onChange={e => setSearchCert2(e.target.value)}
            />
          </div>
          {(() => {
            const filtered = abilitabili.filter(s =>
              (!searchCert2 || s.name.toLowerCase().includes(searchCert2.toLowerCase())) &&
              (!filterTipo2 || s.type === filterTipo2)
            );
            return filtered.length === 0
              ? <p style={{ color: "#888", fontSize: 14, fontStyle: "italic" }}>Nessun fornitore trovato.</p>
              : <table style={S.table}>
                  <thead><tr>
                    <th style={S.th}>Tipo</th>
                    <th style={S.th}>Fornitore</th>
                    <th style={S.th}>Stato qualifica</th>
                    <th style={S.th}>Azioni</th>
                  </tr></thead>
                  <tbody>
                    {filtered.map(s => (
                      <tr key={s.id} onMouseOver={e => e.currentTarget.querySelectorAll("td").forEach(td => td.style.background = "#fafaf8")} onMouseOut={e => e.currentTarget.querySelectorAll("td").forEach(td => td.style.background = "")}>
                        <td style={S.td}><TypeIcon type={s.type} /></td>
                        <td style={{ ...S.td, fontWeight: 500 }}>{s.name}</td>
                        <td style={S.td}>
                          <span style={s.statoQualifica === "Da revisionare" ? statusBadge("In revisione") : statusBadge("Sospeso")}>
                            {s.statoQualifica}
                          </span>
                        </td>
                        <td style={S.td}>
                          <button
                            style={{ ...S.btnSecondary, padding: "5px 12px", fontSize: 13 }}
                            onClick={() => onOpenScheda({ name: s.name, type: s.type })}
                          >Vedi scheda →</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>;
          })()}
        </div>
      )}

      {/* Tab 3 — Gestione accesso alla categoria commerciale — Tecnica only */}
      {isTecnica && activeTab === "richieste" && (() => {
        const filteredNuove = nuoveAggiunte.filter(s =>
          (!searchNuove || s.name.toLowerCase().includes(searchNuove.toLowerCase())) &&
          (!filterTipoNuove || s.type === filterTipoNuove)
        );
        const modalSuppliers = SUPPLIERS.filter(s =>
          (!modalSearch3 || s.name.toLowerCase().includes(modalSearch3.toLowerCase())) &&
          (!modalFilterTipo3 || s.type === modalFilterTipo3)
        );

        const handleAggiungiModal = (s) => {
          setPendingIds(prev => {
            const next = new Set(prev);
            if (next.has(s.id)) { next.delete(s.id); } else { next.add(s.id); }
            return next;
          });
        };

        const handleConfermaModal = () => {
          const toAdd = SUPPLIERS.filter(s => pendingIds.has(s.id) && !nuoveAggiunte.find(n => n.id === s.id));
          setNuoveAggiunte(prev => [...prev, ...toAdd]);
          setPendingIds(new Set());
          setShowAddModal(false);
        };

        const handleRimuoviNuova = (id) => setNuoveAggiunte(prev => prev.filter(s => s.id !== id));
        const handleRespingi = (id) => setRichiesteAccesso(prev => prev.filter(r => r.id !== id));
        const handleConfermaRichiesta = (r) => {
          if (!nuoveAggiunte.find(n => n.id === r.id)) {
            setNuoveAggiunte(prev => [...prev, { id: r.id, name: r.name, type: r.type }]);
          }
          setRichiesteAccesso(prev => prev.filter(x => x.id !== r.id));
        };

        return (
          <>
            {/* Sheet — Nuove aggiunte */}
            <div style={S.card}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <h3 style={{ ...S.h3, margin: 0 }}>Nuove aggiunte</h3>
                <button style={{ ...S.btnSecondary, padding: "6px 16px", fontSize: 13 }} onClick={() => { setShowAddModal(true); setModalSearch3(""); setModalFilterTipo3(""); setPendingIds(new Set()); }}>
                  Aggiungi fornitore
                </button>
              </div>
              <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
                <select style={{ ...S.input, maxWidth: 200, color: filterTipoNuove ? "#333" : "#888" }} value={filterTipoNuove} onChange={e => setFilterTipoNuove(e.target.value)}>
                  <option value="">Tipo: Tutti</option>
                  <option value="prof">Professionista</option>
                  <option value="soc">Società</option>
                </select>
                <input style={{ ...S.input, maxWidth: 240 }} placeholder="Cerca fornitore..." value={searchNuove} onChange={e => setSearchNuove(e.target.value)} />
              </div>
              {filteredNuove.length === 0
                ? <p style={{ fontSize: 14, color: "#aaa", fontStyle: "italic" }}>Nessun fornitore in coda.</p>
                : <table style={S.table}>
                    <thead><tr>
                      <th style={S.th}>Tipo</th>
                      <th style={S.th}>Fornitore</th>
                      <th style={S.th}></th>
                    </tr></thead>
                    <tbody>
                      {filteredNuove.map(s => (
                        <tr key={s.id} onMouseOver={e => e.currentTarget.querySelectorAll("td").forEach(td => td.style.background = "#fafaf8")} onMouseOut={e => e.currentTarget.querySelectorAll("td").forEach(td => td.style.background = "")}>
                          <td style={S.td}><TypeIcon type={s.type} /></td>
                          <td style={{ ...S.td, fontWeight: 500 }}>{s.name}</td>
                          <td style={{ ...S.td, textAlign: "right" }}>
                            <button style={{ ...S.btnGhost, padding: "5px 14px", fontSize: 13, color: "#842029", borderColor: "#f5c2c7" }} onClick={() => handleRimuoviNuova(s.id)}>Rimuovi</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
              }
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
                <button style={{ ...S.btnPrimary, padding: "9px 22px" }} onMouseOver={e => e.target.style.background = "#007236"} onMouseOut={e => e.target.style.background = "#00833E"}>
                  Attiva iter
                </button>
              </div>
            </div>

            {/* Sheet — Richieste di accesso */}
            <div style={{ ...S.card, marginTop: 16 }}>
              <h3 style={{ ...S.h3, marginBottom: 16 }}>Richieste di accesso</h3>
              {richiesteAccesso.length === 0
                ? <p style={{ fontSize: 14, color: "#aaa", fontStyle: "italic" }}>Nessuna richiesta in attesa.</p>
                : <table style={S.table}>
                    <thead><tr>
                      <th style={S.th}>Tipo</th>
                      <th style={S.th}>Fornitore</th>
                      <th style={S.th}>Data</th>
                      <th style={{ ...S.th, textAlign: "right" }}>Azioni</th>
                    </tr></thead>
                    <tbody>
                      {richiesteAccesso.map(r => (
                        <tr key={r.id} onMouseOver={e => e.currentTarget.querySelectorAll("td").forEach(td => td.style.background = "#fafaf8")} onMouseOut={e => e.currentTarget.querySelectorAll("td").forEach(td => td.style.background = "")}>
                          <td style={S.td}><TypeIcon type={r.type} /></td>
                          <td style={{ ...S.td, fontWeight: 500 }}>{r.name}</td>
                          <td style={{ ...S.td, color: "#888" }}>{r.data}</td>
                          <td style={{ ...S.td, textAlign: "right" }}>
                            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                              <button style={{ ...S.btnGhost, padding: "5px 14px", fontSize: 13, color: "#842029", borderColor: "#f5c2c7" }} onClick={() => handleRespingi(r.id)}>Respingi</button>
                              <button style={{ ...S.btnPrimary, padding: "5px 14px", fontSize: 13 }} onMouseOver={e => e.target.style.background = "#007236"} onMouseOut={e => e.target.style.background = "#00833E"} onClick={() => handleConfermaRichiesta(r)}>Conferma</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
              }
            </div>

            {/* Overlay — Aggiungi fornitore */}
            {showAddModal && (
              <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }} onClick={() => setShowAddModal(false)}>
                <div style={{ background: "#fff", borderRadius: 12, padding: "28px 32px", width: 560, maxWidth: "90vw", maxHeight: "80vh", overflowY: "auto", fontFamily: "'DM Sans',sans-serif" }} onClick={e => e.stopPropagation()}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                    <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1a1a1a", margin: 0 }}>Aggiungi fornitore</h2>
                    <button style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "#888" }} onClick={() => setShowAddModal(false)}>✕</button>
                  </div>
                  <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
                    <select style={{ ...S.input, maxWidth: 180, color: modalFilterTipo3 ? "#333" : "#888" }} value={modalFilterTipo3} onChange={e => setModalFilterTipo3(e.target.value)}>
                      <option value="">Tipo: Tutti</option>
                      <option value="prof">Professionista</option>
                      <option value="soc">Società</option>
                    </select>
                    <input style={{ ...S.input, flex: 1 }} placeholder="Cerca fornitore..." value={modalSearch3} onChange={e => setModalSearch3(e.target.value)} />
                  </div>
                  <table style={S.table}>
                    <thead><tr>
                      <th style={S.th}>Tipo</th>
                      <th style={S.th}>Nome</th>
                      <th style={{ ...S.th, width: 100 }}></th>
                    </tr></thead>
                    <tbody>
                      {modalSuppliers.map(s => {
                        const isPending = pendingIds.has(s.id);
                        const alreadyAdded = !!nuoveAggiunte.find(n => n.id === s.id);
                        return (
                          <tr key={s.id} onMouseOver={e => e.currentTarget.querySelectorAll("td").forEach(td => td.style.background = "#fafaf8")} onMouseOut={e => e.currentTarget.querySelectorAll("td").forEach(td => td.style.background = "")}>
                            <td style={S.td}><TypeIcon type={s.type} /></td>
                            <td style={{ ...S.td, fontWeight: 500 }}>{s.name}</td>
                            <td style={{ ...S.td, textAlign: "right" }}>
                              {alreadyAdded
                                ? <span style={{ fontSize: 12, color: "#aaa", fontStyle: "italic" }}>Già aggiunto</span>
                                : isPending
                                  ? <button style={{ ...S.btnGhost, padding: "4px 12px", fontSize: 12, color: "#842029", borderColor: "#f5c2c7" }} onClick={() => handleAggiungiModal(s)}>Annulla</button>
                                  : <button style={{ ...S.btnSecondary, padding: "4px 12px", fontSize: 12 }} onClick={() => handleAggiungiModal(s)}>Aggiungi</button>
                              }
                            </td>
                          </tr>
                        );
                      })}
                      {modalSuppliers.length === 0 && <tr><td colSpan={3} style={{ ...S.td, textAlign: "center", color: "#aaa", padding: 24 }}>Nessun fornitore trovato</td></tr>}
                    </tbody>
                  </table>
                  <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20, gap: 10 }}>
                    <button style={S.btnGhost} onClick={() => setShowAddModal(false)}>Chiudi</button>
                    <button style={{ ...S.btnPrimary, padding: "9px 22px" }} onMouseOver={e => e.target.style.background = "#007236"} onMouseOut={e => e.target.style.background = "#00833E"} onClick={handleConfermaModal}>
                      Conferma
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        );
      })()}

    </div>
  );
}

// ─── Scheda Fornitore (tabbed view) ──────────────────────────────────
function SchedaFornitore({ supplier, showToast }) {
  const [tab, setTab] = useState("anagrafica");
  const [showAbilitaModal, setShowAbilitaModal] = useState(false);
  const [modalSearch, setModalSearch] = useState("");
  const [modalCategoria, setModalCategoria] = useState("");
  const [aggiunti, setAggiunti] = useState(new Set());

  const openAbilita = () => { setShowAbilitaModal(true); setModalSearch(""); setModalCategoria(""); setAggiunti(new Set()); };

  const profQualifiche = QUALIFICHE.filter(q =>
    (q.applies === "Professionista" || q.applies === "Entrambi") &&
    (!modalSearch || q.name.toLowerCase().includes(modalSearch.toLowerCase())) &&
    (!modalCategoria || q.categoria === modalCategoria)
  );

  // Recap data (hardcoded per spec)
  const daValidare = [
    { label: "Sicurezza cantieri", goTab: "qualifiche" },
  ];
  const incomplete = [
    { label: "Informazioni bancarie",    goTab: "anagrafica" },
    { label: "Documenti amministrativi", goTab: "amministrativa" },
    { label: "Due diligence",            goTab: "qualifiche" },
  ];
  const completamento = 60;

  const statNumStyle = { fontSize: 28, fontWeight: 700, color: "#00833E", lineHeight: 1 };
  const statLabelStyle = { fontSize: 13, color: "#888", marginTop: 4 };
  const statSubStyle = { fontSize: 12, color: "#aaa", marginTop: 2 };
  const dividerV = { width: 1, background: "#e8e8e5", alignSelf: "stretch", margin: "0 8px" };

  return (
    <div>
      {/* ── Title row ── */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={S.h1}>{supplier.name}</h1>
        <p style={{ ...S.subtitle, marginBottom: 0 }}>Scheda Fornitore — {supplier.profilo === "prof" ? "Professionista" : supplier.profilo === "montana" ? "Montana" : "Società"}</p>
      </div>
      {/* ── Recap banner ── */}
      <div style={{ ...S.card, display: "flex", alignItems: "center", justifyContent: "space-around", padding: "20px 32px", marginBottom: 20 }}>
        {/* Schede da Validare */}
        <div style={{ textAlign: "center" }}>
          <div style={{ ...statNumStyle, color: "#856404" }}>{daValidare.length}</div>
          <div style={statLabelStyle}>Schede da validare</div>
        </div>
        <div style={dividerV} />
        {/* Schede incomplete */}
        <div style={{ textAlign: "center" }}>
          <div style={{ ...statNumStyle, color: "#842029" }}>{incomplete.length}</div>
          <div style={statLabelStyle}>Schede incomplete</div>
        </div>
        <div style={dividerV} />
        {/* Completamento */}
        <div style={{ textAlign: "center" }}>
          <div style={statNumStyle}>{completamento}%</div>
          <div style={statLabelStyle}>Completamento qualifica</div>
          <div style={statSubStyle}>
            {/* derive filled/total from data: 5 complete out of 8 implied */}
            6/10 sezioni
          </div>
        </div>
      </div>

      {/* ── Two panels ── */}
      <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>

        {/* Left — Schede da validare */}
        <div style={{ ...S.card, flex: 1, marginBottom: 0, background: "#fffdf0", border: "1px solid #f5e6a3" }}>
          <h3 style={{ ...S.h3, color: "#856404", marginBottom: 16 }}>Schede da validare</h3>
          <div style={{ fontSize: 11, fontWeight: 600, color: "#c9a227", textTransform: "uppercase", letterSpacing: 0.5, borderBottom: "1px solid #f5e6a3", paddingBottom: 6, marginBottom: 4 }}>Sezione</div>
          {daValidare.map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: i < daValidare.length - 1 ? "1px solid #f5e6a3" : "none" }}>
              <span style={{ fontSize: 14, color: "#333" }}>{item.label}</span>
              <button
                style={{ ...S.btnPrimary, padding: "5px 16px", fontSize: 13 }}
                onClick={() => setTab(item.goTab)}
                onMouseOver={e => e.target.style.background = "#007236"}
                onMouseOut={e => e.target.style.background = "#00833E"}
              >Valida</button>
            </div>
          ))}
          {daValidare.length === 0 && <p style={{ fontSize: 14, color: "#aaa", fontStyle: "italic", marginTop: 8 }}>Nessuna scheda da validare.</p>}
        </div>

        {/* Right — Schede incomplete */}
        <div style={{ ...S.card, flex: 1, marginBottom: 0, background: "#fff5f5", border: "1px solid #f5c2c7" }}>
          <h3 style={{ ...S.h3, color: "#842029", marginBottom: 16 }}>Schede incomplete</h3>
          <div style={{ fontSize: 11, fontWeight: 600, color: "#c9707a", textTransform: "uppercase", letterSpacing: 0.5, borderBottom: "1px solid #f5c2c7", paddingBottom: 6, marginBottom: 4 }}>Sezione</div>
          {incomplete.map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: i < incomplete.length - 1 ? "1px solid #f5c2c7" : "none" }}>
              <span style={{ fontSize: 14, color: "#333" }}>{item.label}</span>
              <button
                style={{ ...S.btnPrimary, padding: "5px 16px", fontSize: 13 }}
                onClick={() => setTab(item.goTab)}
                onMouseOver={e => e.target.style.background = "#007236"}
                onMouseOut={e => e.target.style.background = "#00833E"}
              >Visualizza</button>
            </div>
          ))}
          {incomplete.length === 0 && <p style={{ fontSize: 14, color: "#aaa", fontStyle: "italic", marginTop: 8 }}>Nessuna scheda incompleta.</p>}
        </div>

      </div>

      {/* ── Accesso nuove qualifiche ── */}
      <div style={{ ...S.card, marginBottom: 24 }}>
        {/* Card header: title + Abilita button */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ ...S.h3, margin: 0 }}>Accesso nuove qualifiche</h3>
          <button style={{ ...S.btnSecondary, padding: "6px 16px", fontSize: 13 }} onClick={openAbilita}>Abilita qualifiche</button>
        </div>

        {/* Table headers */}
        <div style={{ display: "flex", alignItems: "center", fontSize: 11, fontWeight: 600, color: "#aaa", textTransform: "uppercase", letterSpacing: 0.5, borderBottom: "1px solid #f0f0ee", paddingBottom: 6, marginBottom: 4 }}>
          <span style={{ flex: 1 }}>Richieste di qualifica</span>
          <span style={{ width: 140, textAlign: "center" }}>Stato</span>
          <span style={{ width: 180 }}></span>
        </div>

        {/* Mock row — Strutturale */}
        <div style={{ display: "flex", alignItems: "center", padding: "12px 0" }}>
          <span style={{ flex: 1, fontSize: 14, fontWeight: 500, color: "#333" }}>Strutturale</span>
          <span style={{ width: 140, textAlign: "center" }}>
            <span style={statusBadge("In revisione")}>In attesa</span>
          </span>
          <div style={{ width: 180, display: "flex", gap: 8, justifyContent: "flex-end" }}>
            <button style={{ ...S.btnPrimary, padding: "5px 16px", fontSize: 13 }} onMouseOver={e => e.target.style.background = "#007236"} onMouseOut={e => e.target.style.background = "#00833E"} onClick={() => showToast("Richiesta accettata")}>Accetta</button>
            <button style={{ ...S.btnGhost, padding: "5px 16px", fontSize: 13, color: "#842029", borderColor: "#f5c2c7" }} onClick={() => showToast("Richiesta rifiutata")}>Rifiuta</button>
          </div>
        </div>
      </div>

      {/* ── Abilita qualifiche modal ── */}
      {showAbilitaModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }} onClick={() => setShowAbilitaModal(false)}>
          <div style={{ background: "#fff", borderRadius: 12, padding: "28px 32px", width: 640, maxWidth: "90vw", maxHeight: "80vh", overflowY: "auto", fontFamily: "'DM Sans',sans-serif" }} onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1a1a1a", margin: 0 }}>Abilita qualifiche</h2>
              <button style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "#888" }} onClick={() => setShowAbilitaModal(false)}>✕</button>
            </div>
            <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
              <input style={{ ...S.input, maxWidth: 260 }} placeholder="Cerca qualifica..." value={modalSearch} onChange={e => setModalSearch(e.target.value)} />
              <select style={{ ...S.input, maxWidth: 200, color: modalCategoria ? "#333" : "#888" }} value={modalCategoria} onChange={e => setModalCategoria(e.target.value)}>
                <option value="">Categoria: Tutte</option>
                <option value="Anagrafica">Anagrafica</option>
                <option value="Amministrativa">Amministrativa</option>
                <option value="Tecnica">Tecnica</option>
              </select>
            </div>
            <table style={S.table}>
              <thead>
                <tr>
                  <th style={S.th}>Qualifica</th>
                  <th style={S.th}>Categoria</th>
                  <th style={{ ...S.th, width: 110 }}></th>
                </tr>
              </thead>
              <tbody>
                {profQualifiche.map(q => {
                  const isAdded = aggiunti.has(q.id);
                  return (
                    <tr key={q.id} onMouseOver={e => e.currentTarget.querySelectorAll("td").forEach(td => td.style.background = "#fafaf8")} onMouseOut={e => e.currentTarget.querySelectorAll("td").forEach(td => td.style.background = "")}>
                      <td style={{ ...S.td, fontWeight: 500 }}>{q.name}</td>
                      <td style={{ ...S.td, color: "#888", fontSize: 13 }}>{q.categoria}</td>
                      <td style={{ ...S.td, textAlign: "right" }}>
                        {isAdded
                          ? <span style={{ display: "inline-block", padding: "4px 12px", fontSize: 12, fontWeight: 500, color: "#006630", background: "#e6f4ed", borderRadius: 8, border: "1px solid #b2dfcc" }}>Aggiunta ✓</span>
                          : <button style={{ ...S.btnSecondary, padding: "4px 12px", fontSize: 12 }} onClick={() => setAggiunti(prev => new Set([...prev, q.id]))}>Aggiungi</button>
                        }
                      </td>
                    </tr>
                  );
                })}
                {profQualifiche.length === 0 && (
                  <tr><td colSpan={3} style={{ ...S.td, textAlign: "center", color: "#aaa", padding: 24 }}>Nessuna qualifica trovata</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Tabs ── */}
      <div style={{ display: "flex", borderBottom: "1px solid #e8e8e5", marginBottom: 20 }}>
        <button style={S.tab(tab === "anagrafica")} onClick={() => setTab("anagrafica")}>Anagrafica</button>
        <button style={S.tab(tab === "amministrativa")} onClick={() => setTab("amministrativa")}>Amministrativa</button>
        <button style={S.tab(tab === "qualifiche")} onClick={() => setTab("qualifiche")}>Qualifiche Tecniche</button>
        <button style={S.tab(tab === "valutazioni")} onClick={() => setTab("valutazioni")}>Valutazioni</button>
      </div>
      {tab === "anagrafica" && <SchedaAnagrafica showToast={showToast} />}
      {tab === "amministrativa" && <SchedaAmministrativa showToast={showToast} />}
      {tab === "qualifiche" && <SchedaQualifiche showToast={showToast} />}
      {tab === "valutazioni" && <SchedaValutazioni />}
    </div>
  );
}

// ─── Scheda Valutazioni ──────────────────────────────────────────────
function StarDisplay({ value, max = 5, starSize = 18, numFontSize = 13 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <div style={{ display: "flex", gap: 3 }}>
        {Array.from({ length: max }, (_, i) => (
          <svg key={i} width={starSize} height={starSize} viewBox="0 0 24 24"
            fill={i < value ? "#f5a623" : "none"}
            stroke={i < value ? "#f5a623" : "#ddd"}
            strokeWidth="1.5">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        ))}
      </div>
      <span style={{ fontSize: numFontSize, color: "#888", fontWeight: 500, minWidth: 28 }}>{value}/{max}</span>
    </div>
  );
}

function SchedaValutazioni() {
  // Sheet 1 — Valutazioni complessive (read-only)
  const complessive = [
    { id: "economica",    label: "Valutazione Economica",   valore: 3 },
    { id: "servicelead", label: "Valutazione Service Lead", valore: 2 },
  ];

  // Sheet 2 — Valutazioni di commessa (read-only, from portal)
  const commessa = { puntualita: 3, serieta: 4, competenza: 3 };
  const mediaCommessa = Math.round((commessa.puntualita + commessa.serieta + commessa.competenza) / 3);

  // Overall average across all values
  const tuttiValori = [...complessive.map(r => r.valore), commessa.puntualita, commessa.serieta, commessa.competenza];
  const mediaComplessiva = Math.round(tuttiValori.reduce((a, b) => a + b, 0) / tuttiValori.length);

  const rowStyle = { display: "flex", alignItems: "center", padding: "14px 0", borderBottom: "1px solid #f0f0ee" };
  const labelStyle = { fontSize: 14, fontWeight: 500, color: "#333", flex: 1 };

  return (
    <div>

      {/* ── Sheet 0 — Valutazione complessiva fornitore ── */}
      <div style={S.card}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h3 style={{ ...S.h3, margin: 0, whiteSpace: "nowrap" }}>Valutazione complessiva fornitore</h3>
          <StarDisplay value={mediaComplessiva} starSize={23} numFontSize={16} />
        </div>
      </div>

      {/* ── Sheet 1 — Valutazioni generali ── */}
      <div style={S.card}>
        <h3 style={S.h3}>Valutazioni generali</h3>
        <p style={{ fontSize: 13, color: "#888", marginBottom: 16 }}>Valutazioni inserite manualmente dal Service Lead.</p>
        {complessive.map((row, i) => (
          <div key={row.id} style={{ ...rowStyle, borderBottom: i === complessive.length - 1 ? "none" : "1px solid #f0f0ee" }}>
            <span style={labelStyle}>{row.label}</span>
            <StarDisplay value={row.valore} />
          </div>
        ))}
      </div>

      {/* ── Sheet 2 — Valutazioni di commessa ── */}
      <div style={S.card}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
          <h3 style={S.h3}>Valutazioni di commessa</h3>
          <button style={{ ...S.btnPrimary, padding: "6px 16px", fontSize: 13 }}
            onMouseOver={e => e.target.style.background = "#007236"}
            onMouseOut={e => e.target.style.background = "#00833E"}>
            Ricarica
          </button>
        </div>
        <p style={{ fontSize: 13, color: "#888", marginBottom: 16 }}>Valutazioni aggregate dalle valutazioni di commessa di Progeta. Clicca Ricarica per ricaricare.</p>
        <div style={{ ...rowStyle, background: "#fafaf8", margin: "0 -24px", padding: "14px 24px" }}>
          <span style={{ ...labelStyle, fontWeight: 600 }}>Valutazione Complessiva</span>
          <StarDisplay value={mediaCommessa} />
        </div>
        {[
          { label: "Puntualità",  valore: commessa.puntualita },
          { label: "Serietà",     valore: commessa.serieta },
          { label: "Competenza",  valore: commessa.competenza },
        ].map((row, i, arr) => (
          <div key={row.label} style={{ ...rowStyle, borderBottom: i === arr.length - 1 ? "none" : "1px solid #f0f0ee" }}>
            <span style={labelStyle}>{row.label}</span>
            <StarDisplay value={row.valore} />
          </div>
        ))}
      </div>

    </div>
  );
}

// ─── Stoplight ───────────────────────────────────────────────────────
// Three-dot selector: red=Da completare, yellow=In validazione, green=Validato
// Shows current selection highlighted, others dimmed.
const STOPLIGHT_OPTIONS = [
  { value: "Da completare",  color: "#e74c3c", border: "#c0392b" },
  { value: "In validazione", color: "#f0ad4e", border: "#d68910" },
  { value: "Validato",       color: "#27ae60", border: "#1e8449"  },
];

function Stoplight({ value, onChange }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 5, flexShrink: 0 }}>
      {/* red on left, yellow middle, green right */}
      {STOPLIGHT_OPTIONS.map(opt => (
        <button
          key={opt.value}
          title={opt.value}
          onClick={() => onChange(opt.value)}
          style={{
            width: 16, height: 16, borderRadius: "50%", border: `2px solid ${opt.border}`,
            background: value === opt.value ? opt.color : "transparent",
            cursor: "pointer", padding: 0, flexShrink: 0,
            opacity: value === opt.value ? 1 : 0.3,
            transition: "opacity 0.15s, background 0.15s",
          }}
        />
      ))}
    </div>
  );
}

// ─── Shared Components ──────────────────────────────────────────────
function StatusPill({ complete, label }) {
  const text = label || (complete ? "Completo" : "Incompleto");
  return <span style={{ display: "inline-block", padding: "2px 10px", borderRadius: 12, fontSize: 11, fontWeight: 500,
    background: complete ? "#e6f4ed" : "#fde8e8", color: complete ? "#006630" : "#b91c1c",
    border: `1px solid ${complete ? "#b2dfcc" : "#f5c2c7"}`, whiteSpace: "nowrap" }}>{text}</span>;
}

function SchedaSectionCard({ title, status, editingId, sectionId, onEdit, onSave, onCancel, children }) {
  const isEditing = editingId === sectionId;
  const isComplete = status === "Completo";
  const isInRevisione = status === "In revisione";

  const pill = isInRevisione
    ? <span style={statusBadge("In revisione")}>In revisione</span>
    : <StatusPill complete={isComplete} />;

  return (
    <div style={{ ...S.card, marginBottom: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        {/* Left: pill + title */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {pill}
          <h3 style={{ ...S.h3, margin: 0 }}>{title}</h3>
        </div>
        {/* Right: actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {!isEditing
            ? <button style={{ ...S.btnGhost, padding: "4px 14px", fontSize: 12 }} onClick={() => onEdit(sectionId)}>Valida</button>
            : <><button style={{ ...S.btnGhost, padding: "4px 14px", fontSize: 12 }} onClick={onCancel}>Annulla</button><button style={{ ...S.btnPrimary, padding: "4px 14px", fontSize: 12 }} onClick={() => onSave(sectionId)}>Salva</button></>}
        </div>
      </div>
      {typeof children === "function" ? children(isEditing) : children}
    </div>
  );
}

// ─── Scheda Anagrafica ───────────────────────────────────────────────
// tag: current display tag (read mode)
// fieldTag / onTagChange: stoplight state in edit mode
// comment / onCommentChange: comment state when red
function SchedaFieldRow({ label, value, editing, draft, field, setDraft, tag, fieldTag, onTagChange, comment, onCommentChange }) {
  const activeTag = editing ? (fieldTag || tag) : tag;
  const showComment = editing && (fieldTag || tag) === "Da completare";

  if (editing && draft != null && field && setDraft) {
    return (
      <div style={{ borderBottom: "1px solid #f5f5f3" }}>
        <div style={{ display: "flex", alignItems: "center", padding: "10px 0", gap: 12 }}>
          <span style={{ fontSize: 13, fontWeight: 500, color: "#555", flexShrink: 0, minWidth: 160 }}>{label}</span>
          <input style={{ ...S.input, flex: 1 }} value={draft[field] || ""} onChange={e => setDraft({ ...draft, [field]: e.target.value })} />
          <Stoplight value={fieldTag || tag} onChange={onTagChange} />
          {activeTag && <span style={{ ...fieldTagStyle(activeTag), minWidth: 100, textAlign: "center" }}>{activeTag}</span>}
        </div>
        {showComment && (
          <input
            type="text"
            placeholder="Aggiungi un commento"
            value={comment || ""}
            onChange={e => onCommentChange(e.target.value)}
            style={{ ...S.input, marginBottom: 10 }}
          />
        )}
      </div>
    );
  }
  return (
    <div style={{ display: "flex", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #f5f5f3", gap: 12 }}>
      <div style={{ flex: 1 }}>
        <span style={{ fontSize: 13, fontWeight: 500, color: "#555" }}>{label}</span>
        {" "}
        <span style={{ fontSize: 14, color: value ? "#333" : "#ccc" }}>{value || "Non compilato"}</span>
      </div>
      {tag && <span style={fieldTagStyle(tag)}>{tag}</span>}
    </div>
  );
}

function SchedaAnagrafica({ showToast }) {
  const [editingId, setEditingId] = useState(null);
  const [profile, setProfile] = useState(SCHEDA_PROFILE);
  const [draft, setDraft] = useState(SCHEDA_PROFILE);

  // Per-section, per-field tag overrides during edit. Reset on cancel.
  const [fieldTags, setFieldTags] = useState({});
  const [comments, setComments] = useState({});

  const defaultTag = (cardStatus, value) =>
    cardStatus === "Completo" ? "Validato" : (value ? "Validato" : "Da completare");

  const onEdit = (id) => { setDraft({ ...profile }); setEditingId(id); setFieldTags({}); setComments({}); };
  const onCancel = () => { setEditingId(null); setFieldTags({}); setComments({}); };
  const onSave = () => { setProfile({ ...draft }); setEditingId(null); showToast("Modifiche salvate"); };

  // helpers to wire a field row cleanly
  const ft = (key, cardStatus, value) => fieldTags[key] || defaultTag(cardStatus, value);
  const setFt = (key) => (v) => setFieldTags(p => ({ ...p, [key]: v }));
  const cm = (key) => comments[key] || "";
  const setCm = (key) => (v) => setComments(p => ({ ...p, [key]: v }));

  return (
    <div>
      <SchedaSectionCard title="Dati Aziendali e Sede Legale" status="Completo" editingId={editingId} sectionId="dati-aziendali" onEdit={onEdit} onSave={onSave} onCancel={onCancel}>
        {(isEditing) => <>
          <SchedaFieldRow label="Ragione Sociale" value={profile.ragioneSociale} editing={isEditing} draft={draft} field="ragioneSociale" setDraft={setDraft} tag={defaultTag("Completo", profile.ragioneSociale)} fieldTag={ft("ragioneSociale","Completo",profile.ragioneSociale)} onTagChange={setFt("ragioneSociale")} comment={cm("ragioneSociale")} onCommentChange={setCm("ragioneSociale")} />
          <SchedaFieldRow label="Partita IVA (EU)" value={profile.partitaIva} editing={isEditing} draft={draft} field="partitaIva" setDraft={setDraft} tag={defaultTag("Completo", profile.partitaIva)} fieldTag={ft("partitaIva","Completo",profile.partitaIva)} onTagChange={setFt("partitaIva")} comment={cm("partitaIva")} onCommentChange={setCm("partitaIva")} />
          <SchedaFieldRow label="Registration No. (non-EU)" value={profile.registrationNo} editing={isEditing} draft={draft} field="registrationNo" setDraft={setDraft} tag={defaultTag("Completo", profile.registrationNo)} fieldTag={ft("registrationNo","Completo",profile.registrationNo)} onTagChange={setFt("registrationNo")} comment={cm("registrationNo")} onCommentChange={setCm("registrationNo")} />
          <SchedaFieldRow label="Codice Fiscale" value={profile.codiceFiscale} editing={isEditing} draft={draft} field="codiceFiscale" setDraft={setDraft} tag={defaultTag("Completo", profile.codiceFiscale)} fieldTag={ft("codiceFiscale","Completo",profile.codiceFiscale)} onTagChange={setFt("codiceFiscale")} comment={cm("codiceFiscale")} onCommentChange={setCm("codiceFiscale")} />
          <SchedaFieldRow label="Indirizzo" value={profile.indirizzo} editing={isEditing} draft={draft} field="indirizzo" setDraft={setDraft} tag={defaultTag("Completo", profile.indirizzo)} fieldTag={ft("indirizzo","Completo",profile.indirizzo)} onTagChange={setFt("indirizzo")} comment={cm("indirizzo")} onCommentChange={setCm("indirizzo")} />
          <SchedaFieldRow label="CAP" value={profile.cap} editing={isEditing} draft={draft} field="cap" setDraft={setDraft} tag={defaultTag("Completo", profile.cap)} fieldTag={ft("cap","Completo",profile.cap)} onTagChange={setFt("cap")} comment={cm("cap")} onCommentChange={setCm("cap")} />
          <SchedaFieldRow label="Città" value={profile.citta} editing={isEditing} draft={draft} field="citta" setDraft={setDraft} tag={defaultTag("Completo", profile.citta)} fieldTag={ft("citta","Completo",profile.citta)} onTagChange={setFt("citta")} comment={cm("citta")} onCommentChange={setCm("citta")} />
          <SchedaFieldRow label="Nazione" value={profile.nazione} editing={isEditing} draft={draft} field="nazione" setDraft={setDraft} tag={defaultTag("Completo", profile.nazione)} fieldTag={ft("nazione","Completo",profile.nazione)} onTagChange={setFt("nazione")} comment={cm("nazione")} onCommentChange={setCm("nazione")} />
          <SchedaFieldRow label="Telefono sede" value={profile.telefonoSede} editing={isEditing} draft={draft} field="telefonoSede" setDraft={setDraft} tag={defaultTag("Completo", profile.telefonoSede)} fieldTag={ft("telefonoSede","Completo",profile.telefonoSede)} onTagChange={setFt("telefonoSede")} comment={cm("telefonoSede")} onCommentChange={setCm("telefonoSede")} />
          <SchedaFieldRow label="PEC" value={profile.pec} editing={isEditing} draft={draft} field="pec" setDraft={setDraft} tag={defaultTag("Completo", profile.pec)} fieldTag={ft("pec","Completo",profile.pec)} onTagChange={setFt("pec")} comment={cm("pec")} onCommentChange={setCm("pec")} />
        </>}
      </SchedaSectionCard>

      <SchedaSectionCard title="Contatto di Riferimento e Sito Web" status="Completo" editingId={editingId} sectionId="contatto" onEdit={onEdit} onSave={onSave} onCancel={onCancel}>
        {(isEditing) => <>
          <SchedaFieldRow label="Nome contatto" value={profile.nomeContatto} editing={isEditing} draft={draft} field="nomeContatto" setDraft={setDraft} tag={defaultTag("Completo", profile.nomeContatto)} fieldTag={ft("nomeContatto","Completo",profile.nomeContatto)} onTagChange={setFt("nomeContatto")} comment={cm("nomeContatto")} onCommentChange={setCm("nomeContatto")} />
          <SchedaFieldRow label="Cognome contatto" value={profile.cognomeContatto} editing={isEditing} draft={draft} field="cognomeContatto" setDraft={setDraft} tag={defaultTag("Completo", profile.cognomeContatto)} fieldTag={ft("cognomeContatto","Completo",profile.cognomeContatto)} onTagChange={setFt("cognomeContatto")} comment={cm("cognomeContatto")} onCommentChange={setCm("cognomeContatto")} />
          <SchedaFieldRow label="Telefono contatto" value={profile.telefonoContatto} editing={isEditing} draft={draft} field="telefonoContatto" setDraft={setDraft} tag={defaultTag("Completo", profile.telefonoContatto)} fieldTag={ft("telefonoContatto","Completo",profile.telefonoContatto)} onTagChange={setFt("telefonoContatto")} comment={cm("telefonoContatto")} onCommentChange={setCm("telefonoContatto")} />
          <SchedaFieldRow label="Cellulare contatto" value={profile.cellulareContatto} editing={isEditing} draft={draft} field="cellulareContatto" setDraft={setDraft} tag={defaultTag("Completo", profile.cellulareContatto)} fieldTag={ft("cellulareContatto","Completo",profile.cellulareContatto)} onTagChange={setFt("cellulareContatto")} comment={cm("cellulareContatto")} onCommentChange={setCm("cellulareContatto")} />
          <SchedaFieldRow label="Email contatto" value={profile.emailContatto} editing={isEditing} draft={draft} field="emailContatto" setDraft={setDraft} tag={defaultTag("Completo", profile.emailContatto)} fieldTag={ft("emailContatto","Completo",profile.emailContatto)} onTagChange={setFt("emailContatto")} comment={cm("emailContatto")} onCommentChange={setCm("emailContatto")} />
          <SchedaFieldRow label="Sito Internet" value={profile.sitoContatto} editing={isEditing} draft={draft} field="sitoContatto" setDraft={setDraft} tag={defaultTag("Completo", profile.sitoContatto)} fieldTag={ft("sitoContatto","Completo",profile.sitoContatto)} onTagChange={setFt("sitoContatto")} comment={cm("sitoContatto")} onCommentChange={setCm("sitoContatto")} />
        </>}
      </SchedaSectionCard>

      <SchedaSectionCard title="Informazioni Bancarie" status="Incompleto" editingId={editingId} sectionId="bancarie" onEdit={onEdit} onSave={onSave} onCancel={onCancel}>
        {(isEditing) => <>
          <SchedaFieldRow label="Intestatario del conto" value={profile.intestatario} editing={isEditing} draft={draft} field="intestatario" setDraft={setDraft} tag={defaultTag("Incompleto", profile.intestatario)} fieldTag={ft("intestatario","Incompleto",profile.intestatario)} onTagChange={setFt("intestatario")} comment={cm("intestatario")} onCommentChange={setCm("intestatario")} />
          <SchedaFieldRow label="Banca" value={profile.banca} editing={isEditing} draft={draft} field="banca" setDraft={setDraft} tag={defaultTag("Incompleto", profile.banca)} fieldTag={ft("banca","Incompleto",profile.banca)} onTagChange={setFt("banca")} comment={cm("banca")} onCommentChange={setCm("banca")} />
          <SchedaFieldRow label="IBAN (EU)" value={profile.iban} editing={isEditing} draft={draft} field="iban" setDraft={setDraft} tag={defaultTag("Incompleto", profile.iban)} fieldTag={ft("iban","Incompleto",profile.iban)} onTagChange={setFt("iban")} comment={cm("iban")} onCommentChange={setCm("iban")} />
          <SchedaFieldRow label="Numero conto (non-EU)" value={profile.contoNonEu} editing={isEditing} draft={draft} field="contoNonEu" setDraft={setDraft} tag={defaultTag("Incompleto", profile.contoNonEu)} fieldTag={ft("contoNonEu","Incompleto",profile.contoNonEu)} onTagChange={setFt("contoNonEu")} comment={cm("contoNonEu")} onCommentChange={setCm("contoNonEu")} />
          <SchedaFieldRow label="SWIFT/BIC" value={profile.swift} editing={isEditing} draft={draft} field="swift" setDraft={setDraft} tag={defaultTag("Incompleto", profile.swift)} fieldTag={ft("swift","Incompleto",profile.swift)} onTagChange={setFt("swift")} comment={cm("swift")} onCommentChange={setCm("swift")} />
        </>}
      </SchedaSectionCard>

      <SchedaSectionCard title="Dati Fiscali Italy" status="Completo" editingId={editingId} sectionId="fiscali" onEdit={onEdit} onSave={onSave} onCancel={onCancel}>
        {(isEditing) => <>
          <SchedaFieldRow label="Regime agevolato IVA" value={profile.regimeAgevolato} editing={isEditing} draft={draft} field="regimeAgevolato" setDraft={setDraft} tag={defaultTag("Completo", profile.regimeAgevolato)} fieldTag={ft("regimeAgevolato","Completo",profile.regimeAgevolato)} onTagChange={setFt("regimeAgevolato")} comment={cm("regimeAgevolato")} onCommentChange={setCm("regimeAgevolato")} />
          <SchedaFieldRow label="Soggetto a ritenuta d'acconto 20%" value={profile.ritenuta} editing={isEditing} draft={draft} field="ritenuta" setDraft={setDraft} tag={defaultTag("Completo", profile.ritenuta)} fieldTag={ft("ritenuta","Completo",profile.ritenuta)} onTagChange={setFt("ritenuta")} comment={cm("ritenuta")} onCommentChange={setCm("ritenuta")} />
          <SchedaFieldRow label="Iscrizione a casse previdenziali" value={profile.previdenziale} editing={isEditing} draft={draft} field="previdenziale" setDraft={setDraft} tag={defaultTag("Completo", profile.previdenziale)} fieldTag={ft("previdenziale","Completo",profile.previdenziale)} onTagChange={setFt("previdenziale")} comment={cm("previdenziale")} onCommentChange={setCm("previdenziale")} />
          {profile.previdenziale === "Sì" && <>
            <SchedaFieldRow label="Cassa" value={profile.cassa} editing={isEditing} draft={draft} field="cassa" setDraft={setDraft} tag={defaultTag("Completo", profile.cassa)} fieldTag={ft("cassa","Completo",profile.cassa)} onTagChange={setFt("cassa")} comment={cm("cassa")} onCommentChange={setCm("cassa")} />
            <SchedaFieldRow label="Percentuale" value={profile.percentuale} editing={isEditing} draft={draft} field="percentuale" setDraft={setDraft} tag={defaultTag("Completo", profile.percentuale)} fieldTag={ft("percentuale","Completo",profile.percentuale)} onTagChange={setFt("percentuale")} comment={cm("percentuale")} onCommentChange={setCm("percentuale")} />
          </>}
        </>}
      </SchedaSectionCard>
    </div>
  );
}

// ─── Scheda Amministrativa ──────────────────────────────────────────
function AdminDocRow({ doc, tag, editing, fieldTag, onTagChange, comment, onCommentChange }) {
  const activeTag = editing ? (fieldTag || tag) : tag;
  const showComment = editing && (fieldTag || tag) === "Da completare";

  return (
    <div style={{ borderBottom: "1px solid #f5f5f3" }}>
      <div style={{ display: "flex", alignItems: "center", padding: "10px 0", gap: 12 }}>
        {/* Label + filename */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <span style={{ fontSize: 13, fontWeight: 500, color: "#555" }}>{doc.name}</span>
          {" "}
          <span style={{ fontSize: 14, color: doc.uploaded ? "#00833E" : "#ccc", fontStyle: doc.uploaded ? "normal" : "italic" }}>
            {doc.uploaded ? doc.file : "Non caricato"}
          </span>
        </div>
        {/* Scadenza — read mode shows text, edit mode shows date input */}
        {doc.hasExpiry && !editing && (
          <span style={{ fontSize: 12, color: "#888", whiteSpace: "nowrap" }}>Scadenza: {doc.expiry || "—"}</span>
        )}
        {doc.hasExpiry && editing && (
          <input type="date" defaultValue={doc.expiry ? doc.expiry.split("/").reverse().join("-") : ""} style={{ ...S.input, width: 140, fontSize: 12 }} />
        )}
        {/* Edit-mode actions */}
        {editing && (
          <>
            <button style={{ ...S.btnGhost, padding: "3px 12px", fontSize: 11, color: "#842029", borderColor: "#f5c2c7", whiteSpace: "nowrap" }} onClick={() => {}}>Elimina</button>
            <label style={{ ...S.btnGhost, padding: "3px 12px", fontSize: 11, whiteSpace: "nowrap", cursor: "pointer" }}>
              Sostituisci<input type="file" style={{ display: "none" }} onChange={() => {}} />
            </label>
          </>
        )}
        {/* Download — read mode only */}
        {!editing && doc.uploaded && (
          <button style={{ ...S.btnGhost, padding: "3px 12px", fontSize: 11, whiteSpace: "nowrap" }} onClick={() => alert("Download avviato")}>Scarica</button>
        )}
        {/* Stoplight in edit mode, tag in read mode */}
        {editing
          ? <><Stoplight value={fieldTag || tag} onChange={onTagChange} />{activeTag && <span style={{ ...fieldTagStyle(activeTag), minWidth: 100, textAlign: "center" }}>{activeTag}</span>}</>
          : tag && <span style={fieldTagStyle(tag)}>{tag}</span>
        }
      </div>
      {showComment && (
          <input
            type="text"
            placeholder="Aggiungi un commento"
            value={comment || ""}
            onChange={e => onCommentChange(e.target.value)}
            style={{ ...S.input, marginBottom: 10 }}
          />
        )}
    </div>
  );
}

function SchedaAmministrativa({ showToast }) {
  const [editingId, setEditingId] = useState(null);
  const [fieldTags, setFieldTags] = useState({});
  const [comments, setComments] = useState({});

  const onEdit = (id) => { setEditingId(id); setFieldTags({}); setComments({}); };
  const onCancel = () => { setEditingId(null); setFieldTags({}); setComments({}); };
  const onSave = () => { setEditingId(null); showToast("Modifiche salvate"); };

  const defaultAdminTag = (doc) => {
    const validatedNames = ["Visura Camerale", "DURC", "NDA"];
    if (validatedNames.includes(doc.name) && doc.uploaded) return "Validato";
    if (!doc.uploaded) return "Da completare";
    return "Validato";
  };

  const ft = (key, defTag) => fieldTags[key] || defTag;
  const setFt = (key) => (v) => setFieldTags(p => ({ ...p, [key]: v }));
  const cm = (key) => comments[key] || "";
  const setCm = (key) => (v) => setComments(p => ({ ...p, [key]: v }));

  const isEditing = editingId === "amministrativa";

  return (
    <div>
      <SchedaSectionCard title="Documenti amministrativi" status="Incompleto" editingId={editingId} sectionId="amministrativa" onEdit={onEdit} onSave={onSave} onCancel={onCancel}>
        {() => <>
          <p style={{ fontSize: 13, color: "#888", marginBottom: 16 }}>Documentazione obbligatoria per la registrazione e il mantenimento dell'iscrizione.</p>
          {SCHEDA_DOCS.map(d => {
            const defTag = defaultAdminTag(d);
            return (
              <AdminDocRow
                key={d.name} doc={d} tag={defTag} editing={isEditing}
                fieldTag={ft(d.name, defTag)} onTagChange={setFt(d.name)}
                comment={cm(d.name)} onCommentChange={setCm(d.name)}
              />
            );
          })}
        </>}
      </SchedaSectionCard>
    </div>
  );
}

// ─── Scheda Qualifiche Tecniche ─────────────────────────────────────

function QualificaFieldRow({ label, value, tag, editing, fieldTag, onTagChange, comment, onCommentChange }) {
  const activeTag = editing ? (fieldTag || tag) : tag;
  const showComment = editing && (fieldTag || tag) === "Da completare";
  return (
    <div style={{ borderBottom: "1px solid #f5f5f3" }}>
      <div style={{ display: "flex", alignItems: "center", padding: "8px 0", gap: 12 }}>
        <span style={{ fontSize: 13, fontWeight: 500, color: "#555", flexShrink: 0, minWidth: 160 }}>{label}</span>
        {editing
          ? <input style={{ ...S.input, flex: 1 }} defaultValue={value || ""} />
          : <span style={{ flex: 1, fontSize: 14, color: value ? "#333" : "#ccc" }}>{value || "Non compilato"}</span>
        }
        {editing
          ? <><Stoplight value={fieldTag || tag} onChange={onTagChange} />{activeTag && <span style={{ ...fieldTagStyle(activeTag), minWidth: 100, textAlign: "center" }}>{activeTag}</span>}</>
          : tag && <span style={fieldTagStyle(tag)}>{tag}</span>
        }
      </div>
      {showComment && (
        <input
          type="text"
          placeholder="Aggiungi un commento"
          value={comment || ""}
          onChange={e => onCommentChange(e.target.value)}
          style={{ ...S.input, marginBottom: 8 }}
        />
      )}
    </div>
  );
}

function QualificaDocRow({ label, fileName, tag, editing, fieldTag, onTagChange, comment, onCommentChange }) {
  const activeTag = editing ? (fieldTag || tag) : tag;
  const showComment = editing && (fieldTag || tag) === "Da completare";
  return (
    <div style={{ borderBottom: "1px solid #f5f5f3" }}>
      <div style={{ display: "flex", alignItems: "center", padding: "8px 0", gap: 12 }}>
        <div style={{ flex: 1 }}>
          <span style={{ fontSize: 13, fontWeight: 500, color: "#555" }}>{label}</span>
          {" "}
          <span style={{ fontSize: 14, color: fileName ? "#00833E" : "#ccc", fontStyle: fileName ? "normal" : "italic" }}>
            {fileName || "Documento mancante"}
          </span>
        </div>
        {editing && (
          <>
            <button style={{ ...S.btnGhost, padding: "3px 12px", fontSize: 11, color: "#842029", borderColor: "#f5c2c7", whiteSpace: "nowrap" }}>Elimina</button>
            <label style={{ ...S.btnGhost, padding: "3px 12px", fontSize: 11, whiteSpace: "nowrap", cursor: "pointer" }}>
              Sostituisci<input type="file" style={{ display: "none" }} onChange={() => {}} />
            </label>
          </>
        )}
        {editing
          ? <><Stoplight value={fieldTag || tag} onChange={onTagChange} />{activeTag && <span style={{ ...fieldTagStyle(activeTag), minWidth: 100, textAlign: "center" }}>{activeTag}</span>}</>
          : tag && <span style={fieldTagStyle(tag)}>{tag}</span>
        }
      </div>
      {showComment && (
        <input
          type="text"
          placeholder="Aggiungi un commento"
          value={comment || ""}
          onChange={e => onCommentChange(e.target.value)}
          style={{ ...S.input, marginBottom: 8 }}
        />
      )}
    </div>
  );
}

function QualificaCard({ q, editingId, onEdit, onSave, onCancel }) {
  const isEditing = editingId === q.id;
  const isComplete = q.status === "Completo";
  const isInRevisione = q.status === "In revisione";

  const [fieldTags, setFieldTags] = useState({});
  const [comments, setComments] = useState({});

  const defaultTagFor = (field) => {
    if (q.id === "sic") return "In validazione";
    if (q.id === "dd") return field.label === "Referente" ? "In validazione" : (field.value ? "Validato" : "Da completare");
    if (isComplete) return "Validato";
    return field.value ? "Validato" : "Da completare";
  };

  const ft = (key, defTag) => fieldTags[key] || defTag;
  const setFt = (key) => (v) => setFieldTags(p => ({ ...p, [key]: v }));
  const cm = (key) => comments[key] || "";
  const setCm = (key) => (v) => setComments(p => ({ ...p, [key]: v }));

  const handleEdit = (id) => { setFieldTags({}); setComments({}); onEdit(id); };
  const handleCancel = () => { setFieldTags({}); setComments({}); onCancel(); };

  const pill = isInRevisione
    ? <span style={statusBadge("In revisione")}>In revisione</span>
    : <StatusPill complete={isComplete} />;

  return (
    <div style={{ ...S.card, marginBottom: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {pill}
          <h3 style={{ ...S.h3, margin: 0 }}>{q.name}</h3>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {!isEditing
            ? <button style={{ ...S.btnGhost, padding: "4px 14px", fontSize: 12 }} onClick={() => handleEdit(q.id)}>Valida</button>
            : <><button style={{ ...S.btnGhost, padding: "4px 14px", fontSize: 12 }} onClick={handleCancel}>Annulla</button><button style={{ ...S.btnPrimary, padding: "4px 14px", fontSize: 12 }} onClick={() => onSave(q.id)}>Salva</button></>}
        </div>
      </div>
      <p style={{ fontSize: 13, color: "#888", marginBottom: 16 }}>{q.desc}</p>
      {q.fields.map((f, i) => {
        const defTag = defaultTagFor(f);
        if (f.type === "doc") return (
          <QualificaDocRow key={i} label={f.label} fileName={f.value} tag={defTag}
            editing={isEditing} fieldTag={ft(f.label, defTag)} onTagChange={setFt(f.label)}
            comment={cm(f.label)} onCommentChange={setCm(f.label)} />
        );
        return (
          <QualificaFieldRow key={i} label={f.label} value={f.value} tag={defTag}
            editing={isEditing} fieldTag={ft(f.label, defTag)} onTagChange={setFt(f.label)}
            comment={cm(f.label)} onCommentChange={setCm(f.label)} />
        );
      })}
    </div>
  );
}

function SchedaQualifiche({ showToast }) {
  const [editingId, setEditingId] = useState(null);

  const onEdit = (id) => setEditingId(id);
  const onCancel = () => setEditingId(null);
  const onSave = () => { setEditingId(null); showToast("Modifiche salvate"); };

  return (
    <div>
      {SCHEDA_QUALIFICHE_ATTIVE.map(q => (
        <QualificaCard key={q.id} q={q} editingId={editingId} onEdit={onEdit} onSave={onSave} onCancel={onCancel} />
      ))}
    </div>
  );
}

// ─── Valutazioni ─────────────────────────────────────────────────────
// ─── Valutazioni helpers ─────────────────────────────────────────────
const VALUTAZIONI_INIT = SUPPLIERS.map(s => ({
  id: s.id,
  name: s.name,
  profilo: s.profilo,
  tipo: s.tipo,
  categorie: s.categorie,
  val: s.val === "N/D" ? null : parseInt(s.val),
  ultimaValutazione: s.id === 1 ? "2025-01-15"
                   : s.id === 2 ? "2025-03-02"
                   : s.id === 3 ? "2024-11-20"
                   : s.id === 4 ? null
                   : s.id === 5 ? "2025-02-10"
                   : s.id === 6 ? "2025-03-28"
                   : s.id === 7 ? null
                   : s.id === 8 ? "2024-12-05"
                   : null,
}));

function StarPicker({ value, onChange }) {
  const [hover, setHover] = useState(null);
  return (
    <div style={{ display: "flex", gap: 4 }}>
      {[1,2,3,4,5].map(n => {
        const filled = n <= (hover ?? value ?? 0);
        return (
          <svg key={n} width={28} height={28} viewBox="0 0 24 24"
            fill={filled ? "#f5a623" : "none"}
            stroke={filled ? "#f5a623" : "#ccc"}
            strokeWidth="1.5"
            style={{ cursor: "pointer", transition: "fill 0.1s, stroke 0.1s" }}
            onMouseEnter={() => setHover(n)}
            onMouseLeave={() => setHover(null)}
            onClick={() => onChange(n)}>
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        );
      })}
    </div>
  );
}

function ValutazioneList({ suppliers, data, setData }) {
  const [search, setSearch]         = useState("");
  const [sortDir, setSortDir]       = useState("asc");
  const [expandedId, setExpandedId] = useState(null);
  const [pendingVal, setPendingVal] = useState(null);

  const today = new Date().toISOString().slice(0, 10);

  const parseDate = (d) => d ? new Date(d).getTime() : null;

  let rows = data
    .filter(s => suppliers.includes(s.id))
    .filter(s => !search || s.name.toLowerCase().includes(search.toLowerCase()));

  rows = [...rows].sort((a, b) => {
    const da = parseDate(a.ultimaValutazione);
    const db = parseDate(b.ultimaValutazione);
    if (da === null && db === null) return 0;
    if (da === null) return sortDir === "asc" ? 1 : -1;
    if (db === null) return sortDir === "asc" ? -1 : 1;
    return sortDir === "asc" ? da - db : db - da;
  });

  const handleExpand = (id, currentVal) => {
    if (expandedId === id) { setExpandedId(null); setPendingVal(null); return; }
    setExpandedId(id);
    setPendingVal(null);
  };

  const handleSave = (id) => {
    if (pendingVal === null) return;
    setData(prev => prev.map(s => s.id === id
      ? { ...s, val: pendingVal, ultimaValutazione: today }
      : s
    ));
    setExpandedId(null);
    setPendingVal(null);
  };

  const thS = { ...S.th, cursor: "default" };
  const thSort = { ...S.th, cursor: "pointer", userSelect: "none" };

  return (
    <div>
      {/* Filter bar */}
      <div style={{ marginBottom: 16 }}>
        <input
          style={{ ...S.input, maxWidth: 280 }}
          placeholder="Cerca fornitore..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div style={{ ...S.card, overflowX: "auto", padding: 0 }}>
        <table style={{ ...S.table, minWidth: 620 }}>
          <thead>
            <tr>
              <th style={thS}>Profilo</th>
              <th style={thS}>Nome</th>
              <th style={thS}>Categorie</th>
              <th style={thSort} onClick={() => setSortDir(d => d === "asc" ? "desc" : "asc")}>
                Ultima valutazione <span style={{ fontSize: 10 }}>{sortDir === "asc" ? "▲" : "▼"}</span>
              </th>
              <th style={thS}>Val</th>
              <th style={thS}></th>
            </tr>
          </thead>
          <tbody>
            {rows.map(s => {
              const isExpanded = expandedId === s.id;
              return (
                <React.Fragment key={s.id}>
                  <tr
                    onMouseOver={e => { if (!isExpanded) e.currentTarget.querySelectorAll("td").forEach(td => td.style.background = "#fafaf8"); }}
                    onMouseOut={e => { if (!isExpanded) e.currentTarget.querySelectorAll("td").forEach(td => td.style.background = ""); }}>
                    <td style={S.td}><ProfiloIcon profilo={s.profilo} /></td>
                    <td style={{ ...S.td, fontWeight: 500 }}>{s.name}</td>
                    <td style={S.td}>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                        {s.categorie.map((c, i) => <span key={i} style={categoriaTag(c.stato)}>{c.nome}</span>)}
                      </div>
                    </td>
                    <td style={{ ...S.td, color: s.ultimaValutazione ? "#888" : "#ccc", fontSize: 13 }}>
                      {s.ultimaValutazione || "Mai"}
                    </td>
                    <td style={{ ...S.td, fontWeight: 500, fontSize: 13, color: s.val ? "#333" : "#aaa" }}>
                      {s.val ? `${s.val}/5` : "N/D"}
                    </td>
                    <td style={S.td}>
                      <button
                        style={{ ...S.btnSecondary, padding: "5px 14px", fontSize: 13,
                          ...(isExpanded ? { background: "#e6f4ed", borderColor: "#00833E" } : {}) }}
                        onClick={() => handleExpand(s.id, s.val)}>
                        {isExpanded ? "Chiudi" : "Valuta"}
                      </button>
                    </td>
                  </tr>

                  {/* Expanded grading row */}
                  {isExpanded && (
                    <tr>
                      <td colSpan={6} style={{ padding: "16px 24px", background: "#f7fdf9", borderBottom: "1px solid #f0f0ee" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
                          <StarPicker value={pendingVal ?? s.val ?? 0} onChange={setPendingVal} />
                          <div style={{ display: "flex", gap: 8 }}>
                            <button
                              style={{ ...S.btnPrimary, padding: "6px 20px", fontSize: 13,
                                opacity: pendingVal === null ? 0.4 : 1, cursor: pendingVal === null ? "not-allowed" : "pointer" }}
                              onMouseOver={e => { if (pendingVal !== null) e.target.style.background = "#007236"; }}
                              onMouseOut={e => e.target.style.background = "#00833E"}
                              onClick={() => handleSave(s.id)}>
                              Salva
                            </button>
                            <button style={{ ...S.btnGhost, padding: "6px 20px", fontSize: 13 }}
                              onClick={() => { setExpandedId(null); setPendingVal(null); }}>
                              Annulla
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
            {rows.length === 0 && (
              <tr><td colSpan={6} style={{ ...S.td, textAlign: "center", color: "#aaa", padding: 32 }}>Nessun fornitore trovato</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ValutazioniPage() {
  const [tab, setTab]   = useState("nonTecnici");
  const [data, setData] = useState(VALUTAZIONI_INIT);

  const ntIds = SUPPLIERS.filter(s => s.tipo === "NT").map(s => s.id);
  const tIds  = SUPPLIERS.filter(s => s.tipo === "T").map(s => s.id);

  return (
    <div>
      <h1 style={S.h1}>Valutazioni</h1>
      <p style={S.subtitle}>Valutazioni dei fornitori per categoria commerciale</p>

      <div style={{ display: "flex", borderBottom: "1px solid #e8e8e5", marginBottom: 20 }}>
        <button style={S.tab(tab === "nonTecnici")} onClick={() => setTab("nonTecnici")}>Fornitori non tecnici</button>
        <button style={S.tab(tab === "tecnici")}    onClick={() => setTab("tecnici")}>Fornitori Tecnici</button>
      </div>

      {tab === "nonTecnici" && <ValutazioneList suppliers={ntIds} data={data} setData={setData} />}
      {tab === "tecnici"    && <ValutazioneList suppliers={tIds}  data={data} setData={setData} />}
    </div>
  );
}

// ─── B5 Dati Personali ──────────────────────────────────────────────
function DatiPersonaliPage({ showToast }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ nome: "Admin", cognome: "User", email: "admin@montana.it", ruolo: "Amministratore" });
  const [draft, setDraft] = useState(form);

  const startEdit = () => { setDraft(form); setEditing(true); };
  const cancel = () => setEditing(false);
  const save = () => { setForm(draft); setEditing(false); showToast("Modifiche salvate"); };

  const Field = ({ label, field, readOnly }) => (
    <div style={{ display: "flex", alignItems: "center", padding: "14px 0", borderBottom: "1px solid #f5f5f3" }}>
      <div style={{ width: 160, fontSize: 13, fontWeight: 500, color: "#555" }}>{label}</div>
      <div style={{ flex: 1 }}>
        {editing && !readOnly ? (
          <input style={S.input} value={draft[field]} onChange={e => setDraft({ ...draft, [field]: e.target.value })} />
        ) : (
          <span style={{ fontSize: 14, color: "#333" }}>{form[field]}</span>
        )}
      </div>
    </div>
  );

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h1 style={S.h1}>Dati Personali</h1>
          <p style={S.subtitle}>I tuoi dati di profilo</p>
        </div>
        {!editing && <button style={S.btnSecondary} onClick={startEdit}>Modifica</button>}
      </div>
      <div style={S.card}>
        <Field label="Nome" field="nome" />
        <Field label="Cognome" field="cognome" />
        <Field label="Email" field="email" />
        <Field label="Ruolo" field="ruolo" readOnly />
      </div>
      {editing && (
        <div style={{ display: "flex", gap: 12 }}>
          <button style={S.btnPrimary} onClick={save} onMouseOver={e => e.target.style.background = "#007236"} onMouseOut={e => e.target.style.background = "#00833E"}>Salva</button>
          <button style={S.btnGhost} onClick={cancel}>Annulla</button>
        </div>
      )}
    </div>
  );
}

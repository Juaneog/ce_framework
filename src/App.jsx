import React, { useState, useEffect } from 'react';

// Lucide React Icons (assuming they are available in the environment)
const Lightbulb = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1.3.5 2.6 1.5 3.5.8.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 22v-4"/></svg>;
const Briefcase = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/><path d="M12 12h.01"/></svg>;
const Settings = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.78 1.28a2 2 0 0 0 .73 2.73l.15.08a2 2 0 0 1 1 1.74v.44a2 2 0 0 1-1 1.73l-.15.08a2 2 0 0 0-.73 2.73l.78 1.28a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 1-1.74v.44a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.78-1.28a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>;
const Clipboard = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg>;
const Check = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 6 9 17l-5-5"/></svg>;
const X = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>;

// Main App Component
const App = () => {
  const [step, setStep] = useState(1);
  const [aiRole, setAiRole] = useState('');
  const [mainObjective, setMainObjective] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [useCases, setUseCases] = useState(['']);
  const [companyInfo, setCompanyInfo] = useState({
    missionVision: '',
    productsServices: '',
    faqs: '',
    brandVoice: '',
    keyProcesses: '',
  });
  const [aiPersonality, setAiPersonality] = useState({
    formal: 50, // 0-100 scale
    friendly: 50,
    direct: 50,
    empathetic: 50,
    creative: 50,
  });
  const [dosDonts, setDosDonts] = useState({
    dos: [''],
    donts: [''],
  });
  const [escalationRules, setEscalationRules] = useState('');
  const [showCopyMessage, setShowCopyMessage] = useState(false);

  // Function to handle adding/removing use cases
  const handleUseCaseChange = (index, value) => {
    const newUseCases = [...useCases];
    newUseCases[index] = value;
    setUseCases(newUseCases);
  };

  const addUseCase = () => {
    setUseCases([...useCases, '']);
  };

  const removeUseCase = (index) => {
    const newUseCases = useCases.filter((_, i) => i !== index);
    setUseCases(newUseCases);
  };

  // Function to handle adding/removing Do's and Don'ts
  const handleDosDontsChange = (type, index, value) => {
    const newItems = { ...dosDonts };
    newItems[type][index] = value;
    setDosDonts(newItems);
  };

  const addDosDonts = (type) => {
    const newItems = { ...dosDonts };
    newItems[type] = [...newItems[type], ''];
    setDosDonts(newItems);
  };

  const removeDosDonts = (type, index) => {
    const newItems = { ...dosDonts };
    newItems[type] = newItems[type].filter((_, i) => i !== index);
    setDosDonts(newItems);
  };

  // Function to generate the final context prompt
  const generateContextPrompt = () => {
    let prompt = `Eres un asistente de IA para la empresa [Nombre de tu PYME, ¡reemplázalo!].\n`;
    prompt += `Tu rol principal es: ${aiRole}.\n`;
    prompt += `Tu objetivo clave es: ${mainObjective}.\n`;
    prompt += `Tu audiencia principal es: ${targetAudience}.\n\n`;

    prompt += `--- Identidad y Tono de Voz ---\n`;
    prompt += `Tu personalidad debe ser:\n`;
    prompt += `- Formalidad: ${aiPersonality.formal}%\n`;
    prompt += `- Amigable: ${aiPersonality.friendly}%\n`;
    prompt += `- Directo: ${aiPersonality.direct}%\n`;
    prompt += `- Empático: ${aiPersonality.empathetic}%\n`;
    prompt += `- Creativo: ${aiPersonality.creative}%\n`;
    prompt += `Asegúrate de mantener un tono consistente con la guía de marca de la empresa.\n\n`;

    if (dosDonts.dos.some(d => d.trim() !== '')) {
      prompt += `--- Reglas de Comunicación (Qué HACER) ---\n`;
      dosDonts.dos.forEach(d => {
        if (d.trim() !== '') prompt += `- ${d.trim()}\n`;
      });
      prompt += '\n';
    }

    if (dosDonts.donts.some(d => d.trim() !== '')) {
      prompt += `--- Reglas de Comunicación (Qué NO HACER) ---\n`;
      dosDonts.donts.forEach(d => {
        if (d.trim() !== '') prompt += `- ${d.trim()}\n`;
      });
      prompt += '\n';
    }

    prompt += `--- Conocimiento Base de la Empresa ---\n`;
    if (companyInfo.missionVision.trim()) prompt += `Misión/Visión/Valores:\n${companyInfo.missionVision}\n\n`;
    if (companyInfo.productsServices.trim()) prompt += `Descripción de Productos/Servicios:\n${companyInfo.productsServices}\n\n`;
    if (companyInfo.faqs.trim()) prompt += `Preguntas Frecuentes (FAQs) y Respuestas:\n${companyInfo.faqs}\n\n`;
    if (companyInfo.brandVoice.trim()) prompt += `Guía de Voz de Marca (adicional):\n${companyInfo.brandVoice}\n\n`;
    if (companyInfo.keyProcesses.trim()) prompt += `Procesos Clave de Negocio:\n${companyInfo.keyProcesses}\n\n`;

    if (escalationRules.trim()) {
      prompt += `--- Reglas de Escalada a Humano ---\n`;
      prompt += `${escalationRules}\n\n`;
    }

    if (useCases.some(uc => uc.trim() !== '')) {
      prompt += `--- Casos de Uso Iniciales ---\n`;
      useCases.forEach(uc => {
        if (uc.trim() !== '') prompt += `- ${uc.trim()}\n`;
      });
      prompt += '\n';
    }

    prompt += `Siempre utiliza la información proporcionada para responder. Si la información es insuficiente o la pregunta está fuera de tu alcance, indica que no puedes responder y sugiere que el usuario contacte a un humano o proporcione más detalles.`;

    return prompt;
  };

  const handleCopy = () => {
    const textToCopy = generateContextPrompt();
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = textToCopy;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    try {
      document.execCommand('copy');
      setShowCopyMessage(true);
      setTimeout(() => setShowCopyMessage(false), 2000); // Hide after 2 seconds
    } catch (err) {
      console.error('Error al copiar: ', err);
      // Fallback for browsers where execCommand is not supported or fails
      alert('Hubo un error al copiar el texto. Por favor, cópialo manualmente.');
    } finally {
      document.body.removeChild(tempTextArea);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">1. Planificación y Definición Estratégica</h2>
            <p className="text-gray-600">Define el rol de tu IA, sus objetivos y los primeros casos de uso.</p>

            <div>
              <label htmlFor="aiRole" className="block text-sm font-medium text-gray-700 mb-1">Rol de la IA (Ej: Asistente de Ventas, Soporte al Cliente)</label>
              <input
                type="text"
                id="aiRole"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={aiRole}
                onChange={(e) => setAiRole(e.target.value)}
                placeholder="Ej: Asistente virtual para consultas de productos"
              />
            </div>

            <div>
              <label htmlFor="mainObjective" className="block text-sm font-medium text-gray-700 mb-1">Objetivo Clave (Ej: Reducir tiempo de respuesta, Aumentar leads)</label>
              <input
                type="text"
                id="mainObjective"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={mainObjective}
                onChange={(e) => setMainObjective(e.target.value)}
                placeholder="Ej: Mejorar la satisfacción del cliente en un 20%"
              />
            </div>

            <div>
              <label htmlFor="targetAudience" className="block text-sm font-medium text-gray-700 mb-1">Audiencia Principal de la IA</label>
              <input
                type="text"
                id="targetAudience"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                placeholder="Ej: Clientes potenciales y existentes"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Casos de Uso Iniciales (Piloto)</label>
              {useCases.map((uc, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    className="flex-grow p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    value={uc}
                    onChange={(e) => handleUseCaseChange(index, e.target.value)}
                    placeholder={`Caso de uso ${index + 1}`}
                  />
                  {useCases.length > 1 && (
                    <button
                      onClick={() => removeUseCase(index)}
                      className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition duration-200"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={addUseCase}
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-200"
              >
                Añadir Caso de Uso
              </button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">2. Recopilación y Estructuración de Información</h2>
            <p className="text-gray-600">Proporciona a la IA el conocimiento clave de tu negocio. ¡Sé detallado!</p>

            <div>
              <label htmlFor="missionVision" className="block text-sm font-medium text-gray-700 mb-1">Misión, Visión y Valores de la Empresa</label>
              <textarea
                id="missionVision"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 h-24"
                value={companyInfo.missionVision}
                onChange={(e) => setCompanyInfo({ ...companyInfo, missionVision: e.target.value })}
                placeholder="Ej: Nuestra misión es ofrecer soluciones innovadoras..."
              ></textarea>
            </div>

            <div>
              <label htmlFor="productsServices" className="block text-sm font-medium text-gray-700 mb-1">Descripción Detallada de Productos/Servicios</label>
              <textarea
                id="productsServices"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 h-32"
                value={companyInfo.productsServices}
                onChange={(e) => setCompanyInfo({ ...companyInfo, productsServices: e.target.value })}
                placeholder="Ej: Ofrecemos software de gestión para PYMES con módulos de contabilidad, CRM y RRHH..."
              ></textarea>
            </div>

            <div>
              <label htmlFor="faqs" className="block text-sm font-medium text-gray-700 mb-1">Preguntas Frecuentes (FAQs) y sus Respuestas</label>
              <textarea
                id="faqs"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 h-32"
                value={companyInfo.faqs}
                onChange={(e) => setCompanyInfo({ ...companyInfo, faqs: e.target.value })}
                placeholder="Ej: P: ¿Cuál es el tiempo de envío? R: El tiempo de envío es de 3-5 días hábiles..."
              ></textarea>
            </div>

            <div>
              <label htmlFor="brandVoice" className="block text-sm font-medium text-gray-700 mb-1">Guía de Voz de Marca y Estilo de Comunicación</label>
              <textarea
                id="brandVoice"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 h-24"
                value={companyInfo.brandVoice}
                onChange={(e) => setCompanyInfo({ ...companyInfo, brandVoice: e.target.value })}
                placeholder="Ej: Nuestro tono es profesional pero cercano, evitamos la jerga técnica excesiva y usamos un lenguaje inclusivo..."
              ></textarea>
            </div>

            <div>
              <label htmlFor="keyProcesses" className="block text-sm font-medium text-gray-700 mb-1">Descripción de Procesos Clave (Ventas, Soporte, etc.)</label>
              <textarea
                id="keyProcesses"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 h-24"
                value={companyInfo.keyProcesses}
                onChange={(e) => setCompanyInfo({ ...companyInfo, keyProcesses: e.target.value })}
                placeholder="Ej: El proceso de venta incluye: 1. Calificación del lead, 2. Demostración del producto, 3. Negociación..."
              ></textarea>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">3. Diseño de Protocolos de Contexto (MCP)</h2>
            <p className="text-gray-600">Define cómo la IA debe interactuar y qué reglas seguir.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(aiPersonality).map(([trait, value]) => (
                <div key={trait}>
                  <label htmlFor={trait} className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                    {trait}: <span className="font-semibold">{value}%</span>
                  </label>
                  <input
                    type="range"
                    id={trait}
                    min="0"
                    max="100"
                    value={value}
                    onChange={(e) => setAiPersonality({ ...aiPersonality, [trait]: parseInt(e.target.value) })}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg accent-blue-600"
                  />
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">Reglas de Comunicación (Qué HACER)</label>
              {dosDonts.dos.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    className="flex-grow p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    value={item}
                    onChange={(e) => handleDosDontsChange('dos', index, e.target.value)}
                    placeholder="Ej: Siempre sé empático y proactivo"
                  />
                  {dosDonts.dos.length > 1 && (
                    <button
                      onClick={() => removeDosDonts('dos', index)}
                      className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition duration-200"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() => addDosDonts('dos')}
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-200"
              >
                Añadir Regla "HACER"
              </button>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">Reglas de Comunicación (Qué NO HACER)</label>
              {dosDonts.donts.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    className="flex-grow p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    value={item}
                    onChange={(e) => handleDosDontsChange('donts', index, e.target.value)}
                    placeholder="Ej: No uses jerga técnica compleja"
                  />
                  {dosDonts.donts.length > 1 && (
                    <button
                      onClick={() => removeDosDonts('donts', index)}
                      className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition duration-200"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() => addDosDonts('donts')}
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-200"
              >
                Añadir Regla "NO HACER"
              </button>
            </div>

            <div>
              <label htmlFor="escalationRules" className="block text-sm font-medium text-gray-700 mb-1">Reglas de Escalada a Humano</label>
              <textarea
                id="escalationRules"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 h-24"
                value={escalationRules}
                onChange={(e) => setEscalationRules(e.target.value)}
                placeholder="Ej: Escalar a un agente humano si la pregunta requiere información personal del cliente o una decisión de compra compleja."
              ></textarea>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">4. Revisión y Exportación del Contexto</h2>
            <p className="text-gray-600">Aquí tienes el prompt de contexto generado. Puedes copiarlo y usarlo con tu modelo de IA.</p>

            <div className="relative bg-gray-50 p-6 rounded-lg border border-gray-200 shadow-inner">
              <pre className="whitespace-pre-wrap font-mono text-sm text-gray-800 bg-gray-100 p-4 rounded-md overflow-auto max-h-96">
                {generateContextPrompt()}
              </pre>
              <button
                onClick={handleCopy}
                className="absolute top-3 right-3 p-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-200 flex items-center gap-1"
              >
                {showCopyMessage ? <Check className="w-5 h-5 text-green-600" /> : <Clipboard className="w-5 h-5" />}
                {showCopyMessage ? '¡Copiado!' : 'Copiar'}
              </button>
            </div>

            <div className="mt-8 p-4 bg-blue-50 border-l-4 border-blue-400 text-blue-800 rounded-md">
              <h3 className="font-bold text-lg mb-2">Siguientes Pasos (Fase 5: Iteración y Optimización)</h3>
              <p>Una vez que copies y uses este prompt con tu IA, recuerda que el Context Engineering es un proceso continuo:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>**Prueba y Monitorea:** Observa cómo la IA responde con este nuevo contexto.</li>
                <li>**Recopila Feedback:** Pide a los usuarios (internos o externos) que evalúen la calidad de las respuestas.</li>
                <li>**Refina:** Ajusta los protocolos, añade o modifica información en tu base de conocimiento según sea necesario.</li>
                <li>**Expande:** Cuando estés satisfecho, aplica el Context Engineering a nuevos casos de uso.</li>
              </ul>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-sans text-gray-900 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        <header className="bg-blue-700 text-white p-6 text-center rounded-t-xl">
          <h1 className="text-3xl font-extrabold mb-2">Context Engineering para PYMES</h1>
          <p className="text-blue-100">Guía práctica para personalizar tu IA con el conocimiento de tu negocio</p>
        </header>

        <div className="p-6 sm:p-8">
          {/* Progress Indicator */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex-1 text-center">
              <div className={`flex items-center justify-center w-10 h-10 mx-auto rounded-full ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                <Lightbulb className="w-6 h-6" />
              </div>
              <p className="text-xs mt-1 text-gray-600">Planificación</p>
            </div>
            <div className={`flex-1 h-1 bg-gray-200 ${step > 1 ? 'bg-blue-400' : ''} transition-all duration-300`}></div>
            <div className="flex-1 text-center">
              <div className={`flex items-center justify-center w-10 h-10 mx-auto rounded-full ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                <Briefcase className="w-6 h-6" />
              </div>
              <p className="text-xs mt-1 text-gray-600">Información</p>
            </div>
            <div className={`flex-1 h-1 bg-gray-200 ${step > 2 ? 'bg-blue-400' : ''} transition-all duration-300`}></div>
            <div className="flex-1 text-center">
              <div className={`flex items-center justify-center w-10 h-10 mx-auto rounded-full ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                <Settings className="w-6 h-6" />
              </div>
              <p className="text-xs mt-1 text-gray-600">Protocolos</p>
            </div>
            <div className={`flex-1 h-1 bg-gray-200 ${step > 3 ? 'bg-blue-400' : ''} transition-all duration-300`}></div>
            <div className="flex-1 text-center">
              <div className={`flex items-center justify-center w-10 h-10 mx-auto rounded-full ${step >= 4 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                <Clipboard className="w-6 h-6" />
              </div>
              <p className="text-xs mt-1 text-gray-600">Exportar</p>
            </div>
          </div>

          {/* Step Content */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            {renderStepContent()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={() => setStep(step - 1)}
              disabled={step === 1}
              className={`px-6 py-3 rounded-lg shadow-md transition duration-200 ${
                step === 1
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              Anterior
            </button>
            <button
              onClick={() => setStep(step + 1)}
              disabled={step === 4}
              className={`px-6 py-3 rounded-lg shadow-md transition duration-200 ${
                step === 4
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {step === 4 ? 'Finalizar' : 'Siguiente'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

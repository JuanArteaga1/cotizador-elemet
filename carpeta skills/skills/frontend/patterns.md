---
name: frontend-patterns
description: Patrones de UI reutilizables para ELEMENT Cotizador. Modales de confirmación, formularios inline, toggle options, service items, notificaciones.
compatibility: opencode
metadata:
  project: ELEMENT Cotizador
---

# Patrones de UI Frontend

## 1. Modal de Confirmación (ConfirmModal)

Patrón usado en: Historial (eliminar cotización), Ajustes (limpiar historial)

```tsx
const [showConfirm, setShowConfirm] = useState(false);
const [itemToDelete, setItemToDelete] = useState<ID | null>(null);

const handleDelete = (id: ID) => {
  setItemToDelete(id);
  setShowConfirm(true);
};

const confirmDelete = () => {
  if (itemToDelete) {
    deleteItem(itemToDelete);
    showNotification('Eliminado correctamente', 'success');
    setShowConfirm(false);
  }
};

// Render
{showConfirm && (
  <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setShowConfirm(false)}>
    <div className="modal">
      <h3>Confirmar eliminación</h3>
      <p className="small mb-2">{message}</p>
      <div className="grid-2">
        <button className="btn btn-secondary" onClick={() => setShowConfirm(false)}>Cancelar</button>
        <button className="btn btn-danger" onClick={confirmDelete}>Eliminar</button>
      </div>
    </div>
  </div>
)}
```

## 2. Formulario Inline (InlineForm)

Patrón usado en: QuoteStep5 (servicios adicionales), Settings (nuevo servicio, nuevo pago)

```tsx
const [showForm, setShowForm] = useState(false);
const [formData, setFormData] = useState({ name: '', price: '' });

{showForm && (
  <div className="inline-form">
    <h3>Nuevo Item</h3>
    <div style={{ display: 'grid', gap: 12 }}>
      <input className="input" placeholder="Nombre" value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
      <input className="input" type="number" placeholder="Valor" value={formData.price}
        onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
      <div className="grid-2">
        <button className="btn btn-secondary" onClick={() => setShowForm(false)}>Cancelar</button>
        <button className="btn" onClick={handleSave}>Guardar</button>
      </div>
    </div>
  </div>
)}

<button className="btn btn-small btn-secondary" onClick={() => setShowForm(!showForm)}>
  {showForm ? '× Cancelar' : '+ Agregar'}
</button>
```

## 3. Toggle Option

Patrón usado en: QuoteStep2 (modo área, forma lote), QuoteStep4 (paquete completo)

```tsx
const options = ['opcion1', 'opcion2'];
const [selected, setSelected] = useState('opcion1');

<div className="grid-2">
  {options.map((opt) => (
    <div
      key={opt}
      className={`toggle-option ${selected === opt ? 'active' : ''}`}
      onClick={() => setSelected(opt)}
    >
      {opt}
    </div>
  ))}
</div>
```

## 4. Service Item (Selectable Card)

Patrón usado en: QuoteStep4 (selección de servicios)

```tsx
const [selected, setSelected] = useState<string[]>([]);

const toggle = (id: string) => {
  setSelected(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
};

<div
  className={`service-item ${selected.includes(id) ? 'selected' : ''}`}
  onClick={() => toggle(id)}
>
  <div>
    <div style={{ fontWeight: 600 }}>{name}</div>
    <div className="small">${price.toLocaleString('es-CO')}{unit}</div>
  </div>
</div>
```

## 5. Checkbox Item

Patrón usado en: QuoteStep3 (fachadas con volado)

```tsx
const [checked, setChecked] = useState(false);

<div
  className={`checkbox ${checked ? 'checked' : ''}`}
  onClick={() => setChecked(!checked)}
>
  <span>{label}</span>
</div>
```

## 6. Step Indicator + Wizard Navigation

Patrón usado en: QuotePage

```tsx
const [step, setStep] = useState(1);
const totalSteps = 5;

<div className="step-indicator">Paso {step} de {totalSteps}</div>

<div className="flex-between" style={{ gap: 12 }}>
  <button className="btn btn-secondary" onClick={() => setStep(s => s - 1)} style={{ flex: 1 }}>
    ← ATRÁS
  </button>
  <button className="btn" onClick={() => setStep(s => s + 1)} style={{ flex: 2 }}>
    CONTINUAR →
  </button>
</div>
```

## 7. Notification Toast

Usar el hook `useAppStore` para mostrar notificaciones:

```tsx
const showNotification = useAppStore((s) => s.showNotification);

// En cualquier acción
showNotification('Mensaje', 'success'); // o 'error', 'warning'
```

## Reglas visuales

- Cards: fondo #1a1a1a, borde #2a2a2a, border-radius 24px, padding 20px
- Botón primario: fondo #b69462, texto #000, border-radius 16px
- Botón secundario: fondo #1a1a1a, borde #2a2a2a
- Inputs: fondo #0a0a0a, borde #2a2a2a, border-radius 14px
- Bottom nav: fixed, bottom 20px, max-width 400px
- Mobile-first: wrap max-width 430px

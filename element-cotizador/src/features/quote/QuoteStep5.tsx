import { useState } from 'react';
import { useStore } from '../../shared/services/store';
import type { AreaResult } from '../../shared/types';

interface QuoteStep5Props {
  area: AreaResult;
  price: number;
}

export function QuoteStep5({ area, price }: QuoteStep5Props) {
  const { formData, config, setFormData } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [newService, setNewService] = useState({ name: '', price: '' });

  const basePrice = price + (formData.discount || 0);
  const finalPrice = price;

  const addAdditionalService = () => {
    if (!newService.name.trim() || !newService.price) return;
    setFormData({
      additionalServices: [
        ...formData.additionalServices,
        {
          id: Date.now().toString(),
          name: newService.name.trim(),
          price: parseInt(newService.price) || 0,
          unit: '/unidad',
        },
      ],
    });
    setNewService({ name: '', price: '' });
    setShowForm(false);
  };

  const removeAdditionalService = (index: number) => {
    setFormData({
      additionalServices: formData.additionalServices.filter((_, i) => i !== index),
    });
  };

  return (
    <>
      <div className="card mt-2">
        <h3 className="mb-1" style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>{formData.client}</h3>
        <p className="small">{formData.project}</p>
        <p className="small mt-1">Área: {area.total.toFixed(2)} m²</p>
      </div>

      <div className="card">
        <h3 className="mb-2" style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Servicios Adicionales</h3>
        <p className="small mb-2" style={{ color: '#999' }}>
          Agrega servicios extras no incluidos en los paquetes
        </p>

        {showForm && (
          <div className="inline-form">
            <h3 className="mb-2" style={{ fontSize: 18, fontWeight: 600 }}>Nuevo Servicio Adicional</h3>
            <div style={{ display: 'grid', gap: 12 }}>
              <div>
                <p className="small mb-1">Nombre del servicio</p>
                <input
                  className="input"
                  placeholder="Ej: Estudio de suelos"
                  value={newService.name}
                  onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                />
              </div>
              <div>
                <p className="small mb-1">Valor</p>
                <input
                  className="input"
                  type="number"
                  placeholder="Ej: 3500000"
                  value={newService.price}
                  onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                />
              </div>
              <div className="grid-2">
                <button className="btn btn-secondary" onClick={() => setShowForm(false)}>
                  Cancelar
                </button>
                <button className="btn" onClick={addAdditionalService}>
                  Guardar
                </button>
              </div>
            </div>
          </div>
        )}

        {formData.additionalServices.length > 0 ? (
          formData.additionalServices.map((service, i) => (
            <div key={service.id} className="additional-service-item">
              <div>
                <div style={{ fontWeight: 600 }}>{service.name}</div>
                <div className="small">
                  ${service.price.toLocaleString('es-CO')}
                  {service.unit}
                </div>
              </div>
              <button className="btn-small btn-danger" onClick={() => removeAdditionalService(i)}>
                ×
              </button>
            </div>
          ))
        ) : (
          !showForm && (
            <p className="small" style={{ color: '#999', padding: 12, background: '#0a0a0a', borderRadius: 12 }}>
              No hay servicios adicionales
            </p>
          )
        )}

        <button className="btn btn-small btn-secondary mt-2" onClick={() => setShowForm(!showForm)}>
          {showForm ? '× Cancelar' : '+ Agregar Servicio Adicional'}
        </button>
      </div>

      <div className="card">
        <div className="flex-between mb-2">
          <span>Valor base</span>
          <span style={{ fontWeight: 600 }}>${basePrice.toLocaleString('es-CO')}</span>
        </div>

        <div>
          <p className="small mb-1">Descuento (ajuste de valor)</p>
          <input
            className="input"
            type="number"
            step={100}
            value={formData.discount || 0}
            onChange={(e) => setFormData({ discount: parseInt(e.target.value) || 0 })}
            placeholder="0"
          />
          <p className="small mt-1" style={{ color: '#999' }}>
            Ej: 7800 para redondear valores
          </p>
        </div>

        <div className="flex-between mt-2" style={{ paddingTop: 12, borderTop: '1px solid var(--color-line)' }}>
          <span style={{ fontWeight: 600, fontSize: 16 }}>Valor Final</span>
          <span style={{ fontSize: 24, fontWeight: 700, color: '#b69462' }}>
            ${finalPrice.toLocaleString('es-CO')}
          </span>
        </div>
      </div>

      <div className="card">
        <h3 className="mb-2" style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Plan de Pagos</h3>
        <div style={{ display: 'grid', gap: 10 }}>
          {config.paymentPlan.payments.map((payment, i) => (
            <div key={i} className="flex-between">
              <span>
                {payment.percentage}% {payment.name}
              </span>
              <span style={{ fontWeight: 600 }}>
                ${Math.round(finalPrice * payment.percentage / 100).toLocaleString('es-CO')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

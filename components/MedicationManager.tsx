import React, { useState, useEffect } from 'react';
import { Plus, Trash2, AlertCircle, CheckCircle2, Pill, TrendingDown } from 'lucide-react';
import useLocalStorage from '../hooks/useLocalStorage';

interface Medication {
  id: string;
  name: string;
  totalPills: number;
  remainingPills: number;
  dosagePerDay: number; // How many pills per day
  lastUpdated: string;
  lowStockWarningDays: number; // Alert when X days of supply remain
  notes?: string;
}

const MedicationManager: React.FC = () => {
  const [medications, setMedications] = useLocalStorage<Medication[]>('adhd-hub-medications', []);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    totalPills: 0,
    dosagePerDay: 1,
    lowStockWarningDays: 5,
    notes: '',
  });

  const addMedication = () => {
    if (formData.name.trim() && formData.totalPills > 0) {
      const med: Medication = {
        id: Date.now().toString(),
        name: formData.name,
        totalPills: formData.totalPills,
        remainingPills: formData.totalPills,
        dosagePerDay: formData.dosagePerDay,
        lowStockWarningDays: formData.lowStockWarningDays,
        notes: formData.notes,
        lastUpdated: new Date().toISOString(),
      };
      setMedications([...medications, med]);
      setFormData({
        name: '',
        totalPills: 0,
        dosagePerDay: 1,
        lowStockWarningDays: 5,
        notes: '',
      });
      setShowAddForm(false);
    }
  };

  const takeDose = (id: string) => {
    setMedications(
      medications.map((med) =>
        med.id === id
          ? {
              ...med,
              remainingPills: Math.max(0, med.remainingPills - med.dosagePerDay),
              lastUpdated: new Date().toISOString(),
            }
          : med
      )
    );
  };

  const deleteMedication = (id: string) => {
    setMedications(medications.filter((m) => m.id !== id));
  };

  const updateMedication = (id: string, updates: Partial<Medication>) => {
    setMedications(
      medications.map((med) =>
        med.id === id ? { ...med, ...updates, lastUpdated: new Date().toISOString() } : med
      )
    );
  };

  const calculateDaysRemaining = (remainingPills: number, dosagePerDay: number): number => {
    if (dosagePerDay <= 0) return 0;
    return Math.ceil(remainingPills / dosagePerDay);
  };

  const isLowStock = (med: Medication): boolean => {
    const daysRemaining = calculateDaysRemaining(med.remainingPills, med.dosagePerDay);
    return daysRemaining <= med.lowStockWarningDays && med.remainingPills > 0;
  };

  const isOutOfStock = (med: Medication): boolean => {
    return med.remainingPills <= 0;
  };

  const totalLowStockCount = medications.filter(isLowStock).length;
  const totalOutOfStockCount = medications.filter(isOutOfStock).length;

  return (
    <div className="bg-white dark:bg-warm-900 rounded-2xl shadow-sm border border-warm-200 dark:border-warm-800 p-6 md:p-10 transition-colors">
      <h2 className="text-2xl font-bold text-warm-900 dark:text-warm-100 mb-6">Magazynier Leków</h2>

      {/* Status Summary */}
      {medications.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">Wszystkie leki</p>
            <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{medications.length}</p>
          </div>

          {totalLowStockCount > 0 && (
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <div className="flex items-center gap-2">
                <AlertCircle size={18} className="text-yellow-600 dark:text-yellow-400" />
                <div>
                  <p className="text-sm text-yellow-600 dark:text-yellow-400 font-medium">Mały zapas</p>
                  <p className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">{totalLowStockCount}</p>
                </div>
              </div>
            </div>
          )}

          {totalOutOfStockCount > 0 && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <div className="flex items-center gap-2">
                <AlertCircle size={18} className="text-red-600 dark:text-red-400" />
                <div>
                  <p className="text-sm text-red-600 dark:text-red-400 font-medium">Brak zapasu</p>
                  <p className="text-2xl font-bold text-red-700 dark:text-red-300">{totalOutOfStockCount}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Add Medication Form */}
      {showAddForm ? (
        <div className="mb-6 p-4 bg-warm-50 dark:bg-warm-800/50 rounded-xl border border-warm-200 dark:border-warm-700">
          <h3 className="text-lg font-bold text-warm-900 dark:text-warm-100 mb-4">Dodaj lek</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-warm-700 dark:text-warm-300 mb-2">
                Nazwa leku *
              </label>
              <input
                type="text"
                placeholder="np. Metylofenidat, Sertralin"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-warm-200 dark:border-warm-700 rounded-lg bg-white dark:bg-warm-900 text-warm-900 dark:text-warm-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-warm-700 dark:text-warm-300 mb-2">
                  Liczba tabletek *
                </label>
                <input
                  type="number"
                  min="1"
                  placeholder="30"
                  value={formData.totalPills || ''}
                  onChange={(e) => setFormData({ ...formData, totalPills: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-warm-200 dark:border-warm-700 rounded-lg bg-white dark:bg-warm-900 text-warm-900 dark:text-warm-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-warm-700 dark:text-warm-300 mb-2">
                  Tabletkek dziennie *
                </label>
                <input
                  type="number"
                  min="0.5"
                  step="0.5"
                  placeholder="1"
                  value={formData.dosagePerDay || ''}
                  onChange={(e) => setFormData({ ...formData, dosagePerDay: parseFloat(e.target.value) || 1 })}
                  className="w-full px-3 py-2 border border-warm-200 dark:border-warm-700 rounded-lg bg-white dark:bg-warm-900 text-warm-900 dark:text-warm-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-warm-700 dark:text-warm-300 mb-2">
                Ostrzeż, gdy zostanie na (dni)
              </label>
              <input
                type="number"
                min="1"
                placeholder="5"
                value={formData.lowStockWarningDays || ''}
                onChange={(e) => setFormData({ ...formData, lowStockWarningDays: parseInt(e.target.value) || 5 })}
                className="w-full px-3 py-2 border border-warm-200 dark:border-warm-700 rounded-lg bg-white dark:bg-warm-900 text-warm-900 dark:text-warm-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-warm-700 dark:text-warm-300 mb-2">
                Notatki (opcjonalnie)
              </label>
              <textarea
                placeholder="np. Brać na śniadanie, mogą powodować bezsenność"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-3 py-2 border border-warm-200 dark:border-warm-700 rounded-lg bg-white dark:bg-warm-900 text-warm-900 dark:text-warm-100 focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
                rows={2}
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={addMedication}
                className="flex-1 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg font-medium transition-colors"
              >
                Dodaj lek
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="flex-1 px-4 py-2 bg-warm-200 dark:bg-warm-700 text-warm-700 dark:text-warm-300 rounded-lg font-medium hover:bg-warm-300 dark:hover:bg-warm-600 transition-colors"
              >
                Anuluj
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowAddForm(true)}
          className="mb-6 w-full px-4 py-3 bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 rounded-lg font-medium hover:bg-brand-200 dark:hover:bg-brand-900/50 transition-colors flex items-center justify-center gap-2"
        >
          <Plus size={20} /> Dodaj nowy lek
        </button>
      )}

      {/* Medications List */}
      {medications.length === 0 ? (
        <div className="text-center py-12">
          <Pill size={48} className="mx-auto text-warm-300 dark:text-warm-700 mb-4" />
          <p className="text-warm-500 dark:text-warm-400 text-lg mb-2">Brak leków na liście</p>
          <p className="text-warm-400 dark:text-warm-500 text-sm">Dodaj swoje leki, aby śledzić zapasy i przypomnienia</p>
        </div>
      ) : (
        <div className="space-y-4">
          {medications.map((med) => {
            const daysRemaining = calculateDaysRemaining(med.remainingPills, med.dosagePerDay);
            const progressPercent = (med.remainingPills / med.totalPills) * 100;
            const lowStock = isLowStock(med);
            const outOfStock = isOutOfStock(med);

            return (
              <div
                key={med.id}
                className={`p-4 rounded-xl border-2 transition-all ${
                  outOfStock
                    ? 'bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-800'
                    : lowStock
                    ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-300 dark:border-yellow-800'
                    : 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-800'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-warm-900 dark:text-warm-100">{med.name}</h3>
                    {med.notes && (
                      <p className="text-xs text-warm-500 dark:text-warm-400 mt-1 italic">{med.notes}</p>
                    )}
                  </div>
                  <button
                    onClick={() => deleteMedication(med.id)}
                    className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="flex justify-between items-end mb-2">
                    <div>
                      <p className="text-sm font-medium text-warm-700 dark:text-warm-300">
                        {med.remainingPills} / {med.totalPills} tabletek
                      </p>
                      <p className="text-xs text-warm-500 dark:text-warm-400">
                        {outOfStock
                          ? '⚠️ Brak zapasu - zamów receptę!'
                          : `${daysRemaining} dni (${med.dosagePerDay} tab./dzień)`}
                      </p>
                    </div>
                  </div>
                  <div className="w-full bg-warm-200 dark:bg-warm-700 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full transition-all ${
                        outOfStock
                          ? 'bg-red-600'
                          : lowStock
                          ? 'bg-yellow-500'
                          : 'bg-green-500'
                      }`}
                      style={{ width: `${Math.max(5, progressPercent)}%` }}
                    />
                  </div>
                </div>

                {/* Warning Message */}
                {lowStock && !outOfStock && (
                  <div className="mb-3 p-2 bg-yellow-100 dark:bg-yellow-900/40 rounded flex items-center gap-2 text-sm text-yellow-700 dark:text-yellow-300">
                    <AlertCircle size={16} />
                    <span>
                      Zostało Ci leków na <strong>{daysRemaining} dni</strong> — zanieś receptę do apteki!
                    </span>
                  </div>
                )}

                {outOfStock && (
                  <div className="mb-3 p-2 bg-red-100 dark:bg-red-900/40 rounded flex items-center gap-2 text-sm text-red-700 dark:text-red-300">
                    <AlertCircle size={16} />
                    <span>
                      <strong>Skończyły się tabletki!</strong> Natychmiast zanieś receptę do apteki!
                    </span>
                  </div>
                )}

                {/* Action Button */}
                <button
                  onClick={() => takeDose(med.id)}
                  disabled={outOfStock}
                  className={`w-full px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                    outOfStock
                      ? 'bg-warm-200 dark:bg-warm-700 text-warm-500 dark:text-warm-400 cursor-not-allowed'
                      : 'bg-brand-600 hover:bg-brand-700 text-white active:scale-95'
                  }`}
                >
                  <CheckCircle2 size={18} />
                  {outOfStock ? 'Brak tabletek' : 'Wziąłem dawkę'}
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Tips */}
      {medications.length > 0 && (
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg text-sm text-blue-700 dark:text-blue-300">
          <p className="font-medium mb-2">💡 Wskazówki:</p>
          <ul className="list-disc list-inside space-y-1 text-xs">
            <li>Kliknij "Wziąłem dawkę" każdego dnia, aby śledzić zapasy</li>
            <li>Ostrzeżenie pojawia się, gdy zostanie Ci zapas na ustawioną liczbę dni</li>
            <li>Notatki pomogą Ci pamiętać o ważnych informacjach o leku</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default MedicationManager;

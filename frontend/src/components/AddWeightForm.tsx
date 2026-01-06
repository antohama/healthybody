import { useState } from 'react';
import { addWeight } from '../api/weight';

export function AddWeightForm() {
  const [value, setValue] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  async function handleSubmit() {
    try {
      await addWeight({ value: Number(value) });
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  return (
    <div>
      <input aria-label="weight" value={value} onChange={(e) => setValue(e.target.value)} />
      <button disabled={!value.trim()} onClick={handleSubmit}>
        Add
      </button>

      {status === 'success' && <p>Saved</p>}
      {status === 'error' && <p role="alert">Error</p>}
    </div>
  );
}

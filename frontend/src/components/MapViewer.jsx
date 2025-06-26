
import { useTranslation } from 'react-i18next';

export default function MapViewer({ mapUrl, name }) {
  const { t } = useTranslation();
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      {mapUrl ? (
        <img src={mapUrl} alt={name || "Map"} className="max-h-[55vh] max-w-full rounded-2xl shadow-dnd object-contain" />
      ) : (
        <div className="text-dndgold/80 font-dnd text-xl">{t('map_not_selected')}</div>
      )}
      {name && <div className="text-dndgold/70 mt-2">{name}</div>}
    </div>
  );
}

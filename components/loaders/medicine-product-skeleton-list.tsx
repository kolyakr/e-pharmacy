import ContentLoader from "react-content-loader";

const MedicineProductSkeleton = () => {
  return (
    <ContentLoader
      speed={2}
      width={280}
      height={360}
      viewBox="0 0 280 360"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      {/* Зображення продукту */}
      <rect x="15" y="15" rx="10" ry="10" width="250" height="180" />

      {/* Назва продукту */}
      <rect x="15" y="210" rx="5" ry="5" width="180" height="20" />

      {/* Категорія */}
      <rect x="15" y="240" rx="4" ry="4" width="120" height="15" />

      {/* Ціна */}
      <rect x="200" y="210" rx="5" ry="5" width="60" height="20" />

      {/* Кнопка "Додати в кошик" */}
      <rect x="15" y="275" rx="8" ry="8" width="120" height="35" />

      {/* Кнопка "Деталі" */}
      <rect x="160" y="275" rx="8" ry="8" width="100" height="35" />
    </ContentLoader>
  );
};

const TopBarSkeleton = () => {
  return (
    <ContentLoader
      speed={2}
      width={800}
      height={50}
      viewBox="0 0 800 50"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      {/* Три частини смужки */}
      <rect x="10" y="15" rx="5" ry="5" width="600" height="100" />
    </ContentLoader>
  );
};

const MedicineProductSkeletonList = () => {
  return (
    <div className="flex flex-col gap-5">
      <TopBarSkeleton />
      <ul className="grid grid-cols-1 gap-5 place-items-center md:grid-cols-3 xl:grid-cols-4 mb-10">
        {Array.from({ length: 8 }).map((_, index) => (
          <li key={index}>
            <MedicineProductSkeleton />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MedicineProductSkeletonList;

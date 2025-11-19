import appData from '../data/apps.json';

const SIMULATION_DELAY = 400;

const waitMs = (duration = SIMULATION_DELAY) =>
  new Promise((resolve) => setTimeout(resolve, duration));

const getAppSnapshot = () => JSON.parse(JSON.stringify(appData));


export const getAllApps = async (delay = SIMULATION_DELAY) => {
  await waitMs(delay);
  return getAppSnapshot();
};


export const getAppDetailsById = async (id, delay = SIMULATION_DELAY) => {

  const appId = Number(id);
  if (isNaN(appId)) return null;

  const apps = getAppSnapshot();
  await waitMs(delay);


  for (const app of apps) {
    if (app.id === appId) {
      return app;
    }
  }
  return null;
};


export const getFeaturedApps = (apps, count = 8) =>
  apps
    .sort((a, b) => b.downloads - a.downloads)
    .slice(0, count);


export const filterAppsByTitle = (apps, searchString) => {
  const query = searchString.trim().toLowerCase();
  if (query.length === 0) {
    return apps;
  }

  return apps.filter((app) =>
    app.title.toLowerCase().includes(query)
  );
};


export const sortAppsByDownloads = (apps, sortOrder = 'default') => {
  const sortedList = [...apps];

  if (sortOrder === 'high-low') {
    sortedList.sort((a, b) => b.downloads - a.downloads);
  } else if (sortOrder === 'low-high') {
    sortedList.sort((a, b) => a.downloads - b.downloads);
  }

  return sortedList;
};


export const calculateAppStats = (apps) => {
  let totalDownloads = 0;
  let totalReviews = 0;
  let totalRatingSum = 0;

  for (const app of apps) {
    totalDownloads += app.downloads;
    totalReviews += app.reviews;
    totalRatingSum += app.ratingAvg;
  }

  const ratingAverage = apps.length > 0 ? totalRatingSum / apps.length : 0;

  return {
    aggregateDownloads: totalDownloads,
    aggregateReviews: totalReviews,
    averageRating: Number(ratingAverage.toFixed(2)),
  };
};


export const formatRatingsForChart = (ratings) =>
  ratings.map((rating) => ({

    key: rating.name,
    count: rating.count,
    starValue: rating.name.split(' ')[0],
  }));

export { waitMs };
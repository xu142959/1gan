import { useState, useEffect, useCallback } from 'react';
import { streamersAPI } from '../services/api';

interface Streamer {
  id: number;
  username: string;
  avatar_url: string;
  viewers: number;
  isLive: boolean;
  isHD: boolean;
  category: string;
  tags: string[];
  rating?: number;
  country?: string;
  age?: number;
  isPrivate?: boolean;
  privatePrice?: number;
  roomTitle?: string;
  roomId?: string;
  isRecommended?: boolean;
  isNew?: boolean;
  isHot?: boolean;
  isVIP?: boolean;
  vipLevel?: string;
  daysStreaming?: number;
  hotnessScore?: number;
  trendingScore?: number;
  specialFeatures?: number;
}

interface StreamersResponse {
  streamers: Streamer[];
  pagination: {
    page: number;
    limit: number;
    hasMore: boolean;
  };
}

export const useStreamers = (type: 'online' | 'recommended' | 'new' | 'hot' | 'vip' = 'online') => {
  const [streamers, setStreamers] = useState<Streamer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const loadStreamers = useCallback(async (reset = false) => {
    if (loading) return;

    setLoading(true);
    setError(null);

    try {
      const currentPage = reset ? 1 : page;
      let response: StreamersResponse;

      switch (type) {
        case 'recommended':
          response = await streamersAPI.getRecommendedStreamers({ page: currentPage, limit: 24 });
          break;
        case 'new':
          response = await streamersAPI.getNewStreamers({ page: currentPage, limit: 24 });
          break;
        case 'hot':
          response = await streamersAPI.getHotStreamers({ page: currentPage, limit: 24 });
          break;
        case 'vip':
          response = await streamersAPI.getVIPStreamers({ page: currentPage, limit: 24 });
          break;
        default:
          response = await streamersAPI.getOnlineStreamers({ page: currentPage, limit: 24 });
      }

      if (reset) {
        setStreamers(response.streamers);
        setPage(2);
      } else {
        setStreamers(prev => [...prev, ...response.streamers]);
        setPage(prev => prev + 1);
      }

      setHasMore(response.pagination.hasMore);
    } catch (err) {
      setError(err instanceof Error ? err.message : '加载主播失败');
    } finally {
      setLoading(false);
    }
  }, [type, page, loading]);

  const refresh = useCallback(() => {
    setPage(1);
    setHasMore(true);
    loadStreamers(true);
  }, [loadStreamers]);

  const loadMore = useCallback(() => {
    if (hasMore && !loading) {
      loadStreamers(false);
    }
  }, [hasMore, loading, loadStreamers]);

  useEffect(() => {
    refresh();
  }, [type]);

  return {
    streamers,
    loading,
    error,
    hasMore,
    refresh,
    loadMore,
  };
};

export const useStreamerSearch = () => {
  const [results, setResults] = useState<Streamer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await streamersAPI.searchStreamers(query, { limit: 50 });
      setResults(response.streamers);
    } catch (err) {
      setError(err instanceof Error ? err.message : '搜索失败');
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const clear = useCallback(() => {
    setResults([]);
    setError(null);
  }, []);

  return {
    results,
    loading,
    error,
    search,
    clear,
  };
};

export const useCategoryStreamers = (category: string) => {
  const [streamers, setStreamers] = useState<Streamer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const loadStreamers = useCallback(async (reset = false) => {
    if (loading || !category) return;

    setLoading(true);
    setError(null);

    try {
      const currentPage = reset ? 1 : page;
      const response = await streamersAPI.getCategoryStreamers(category, { 
        page: currentPage, 
        limit: 24,
        sort: 'viewers'
      });

      if (reset) {
        setStreamers(response.streamers);
        setPage(2);
      } else {
        setStreamers(prev => [...prev, ...response.streamers]);
        setPage(prev => prev + 1);
      }

      setHasMore(response.pagination.hasMore);
    } catch (err) {
      setError(err instanceof Error ? err.message : '加载分类主播失败');
    } finally {
      setLoading(false);
    }
  }, [category, page, loading]);

  const refresh = useCallback(() => {
    setPage(1);
    setHasMore(true);
    loadStreamers(true);
  }, [loadStreamers]);

  const loadMore = useCallback(() => {
    if (hasMore && !loading) {
      loadStreamers(false);
    }
  }, [hasMore, loading, loadStreamers]);

  useEffect(() => {
    if (category) {
      refresh();
    }
  }, [category, refresh]);

  return {
    streamers,
    loading,
    error,
    hasMore,
    refresh,
    loadMore,
  };
};
'use client';

import { useState, useEffect } from 'react';
import { translate } from '@/lib/i18n/server';

type Props = {
  lang: string;
};

export default function LinkStatusCheckerForm({ lang }: Props) {
  const [url, setUrl] = useState('');
  const [links, setLinks] = useState<{ url: string; status: number }[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sortedLinks, setSortedLinks] = useState<{ url: string; status: number }[]>([]);

  useEffect(() => {
    if (links.length > 0) {
      const newSortedLinks = [...links].sort((a, b) => {
        const aIsError = a.status >= 400 && a.status < 600;
        const bIsError = b.status >= 400 && b.status < 600;

        if (aIsError && !bIsError) {
          return -1;
        }
        if (!aIsError && bIsError) {
          return 1;
        }
        return a.status - b.status;
      });
      setSortedLinks(newSortedLinks);
    }
  }, [links]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLinks([]);
    setLoading(true);

    try {
      const response = await fetch(`/api/seo?url=${encodeURIComponent(url)}`);
      const data = await response.json();

      if (response.ok) {
        setLinks(data.links);
      } else {
        setError(data.error || translate(lang, 'link-status-checker.errors.general'));
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message || translate(lang, 'link-status-checker.errors.general'));
      } else {
        setError(translate(lang, 'link-status-checker.errors.general'));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-300">
            {translate(lang, 'link-status-checker.form.url.label')}
          </label>
          <div className="mt-1">
            <input
              id="url"
              name="url"
              type="url"
              autoComplete="url"
              required
              className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm bg-gray-800 text-white"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder={translate(lang, 'link-status-checker.form.url.placeholder')}
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            disabled={loading}
          >
            {loading 
              ? translate(lang, 'link-status-checker.form.button.checking') 
              : translate(lang, 'link-status-checker.form.button.check')}
          </button>
        </div>
      </form>

      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="text-red-700">
            {error}
          </div>
        </div>
      )}

      {sortedLinks.length > 0 && (
        <div className="mt-4">
          <h2 className="text-lg font-medium text-gray-300">
            {translate(lang, 'link-status-checker.results.title')}:
          </h2>
          <ul className="mt-2 space-y-1">
            {sortedLinks.map((link, index) => (
              <li key={index} className="text-gray-400">
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`hover:text-purple-500 ${
                    link.status >= 400 && link.status < 600
                      ? 'text-red-500'
                      : 'text-purple-400'
                  }`}
                >
                  {link.url}
                </a>
                <span className="ml-2">
                  {translate(lang, 'link-status-checker.results.status')}: {link.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
} 
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { useMemo } from 'react';

type QueryParamValue = string | string[] | undefined;

type QueryParamParser<T> = (value: QueryParamValue) => T | undefined;

export const queryParamStringParser: QueryParamParser<string> = (
  value: QueryParamValue,
) => (Array.isArray(value) ? value[0] : value);

export const queryParamNumberParser: QueryParamParser<number> = (
  value: QueryParamValue,
) => (Array.isArray(value) ? Number(value[0]) : Number(value));

export const extractQueryParam = <T>(
  param: ParsedUrlQuery,
  key: string,
  parser: QueryParamParser<T>,
) => {
  return parser(param[key]);
};

export const useQueryParam = <T>(key: string, parser: QueryParamParser<T>) => {
  const router = useRouter();
  return useMemo(
    () => extractQueryParam(router.query, key, parser),
    [router.query, key, parser],
  );
};

export const useExtractedQueryParam = <T>(
  param: ParsedUrlQuery,
  key: string,
  parser: QueryParamParser<T>,
) => {
  return useMemo(
    () => extractQueryParam(param, key, parser),
    [param, key, parser],
  );
};

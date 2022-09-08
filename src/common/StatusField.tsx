import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import MyText from './MyText';

const DEFAULT_INTERVAL_MS = 3000;

export interface StatusFieldProps {
  text: string;
  check: () => Promise<boolean>;
  intervalMs?: number;
}

function status(isLoading: boolean, isOk: boolean) {
  if (isLoading) {
    return <ActivityIndicator />;
  }
  return isOk ? <>🟢</> : <>🔴</>;
}

export default function StatusField({
  text,
  check,
  intervalMs = DEFAULT_INTERVAL_MS,
}: StatusFieldProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isOk, setIsOk] = useState(false);

  function updateState(v: boolean) {
    setIsOk(v);
    setIsLoading(false);
  }

  useEffect(() => {
    let interval: number;
    check().then((res) => {
      updateState(res);
      interval = setInterval(() => {
        check().then((v) => updateState(v));
      }, intervalMs);
    });
    return () => clearInterval(interval);
  }, [check, intervalMs]);

  return (
    <MyText>
      {status(isLoading, isOk)}
      {' ' + text}
    </MyText>
  );
}

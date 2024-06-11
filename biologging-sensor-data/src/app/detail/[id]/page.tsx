'use client'
import React, { useEffect, useState } from 'react';
import '../../index.css';
import Detail from './Detail';
import { getDataset } from '@/api/dataset/api';
import { AxiosError } from 'axios';
import ErrorComponent from '@/components/Error';
import { Dataset } from '@/api/dataset/dataset';

/**
 * For including "detail" page in routing. 
 */
export default function DetailPage({ params }: { params: { id: string } }) {
  const [detail, setDetailData] = useState<Dataset | null>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getDataset(params.id);
      if (response instanceof AxiosError) {
        setError(true);
        return;
      }

      setError(false);
      setDetailData(response);
    };

    fetchData();
  }, []);

  return (
    <div>
      {error ? <ErrorComponent /> : <Detail detail={detail} />}
    </div>
  );
}

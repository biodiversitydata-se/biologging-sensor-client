'use client'
import React, { useEffect, useState } from 'react';
import '../../index.css';
import Detail from './Detail';
import { getDataset } from '@/api/dataset/api';
import { AxiosError } from 'axios';
import ErrorComponent from '@/components/Error';
import { Dataset } from '@/api/dataset/dataset';
import Loader from '@/components/Loader';

/**
 * For including "detail" page in routing. 
 */
export default function DetailPage({ params }: { params: { id: string } }) {
  const [detail, setDetailData] = useState<Dataset | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await getDataset(params.id);
      if (response instanceof AxiosError) {
        setLoading(false);
        setError(true);
        return;
      }

      setError(false);
      setDetailData(response);
      setLoading(false);
    };

    fetchData();
  }, [params.id]);

  return (
    <div>
      {
        loading ? <Loader />
          : error
            ? <ErrorComponent />
            : <Detail detail={detail} />
      }
    </div>
  );
}

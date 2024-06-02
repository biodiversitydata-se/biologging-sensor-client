'use client'
import React, { useEffect, useState } from 'react';
import '../../index.css';
import { Dataset } from '@/api/dataset/dataset.interface';
import Detail from './Detail';
import { getDataset } from '@/api/dataset/api';
import { AxiosError } from 'axios';
import ErrorComponent from '@/components/Error';

export default function DetailPage({ params }: { params: { id: string } }) {
  const [detail, setDetailData] = useState<Dataset | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getDataset(params.id);
      if (response instanceof AxiosError) {
        return;
      }

      setDetailData(response);
    };

    fetchData();
  }, []);

  return (
    <div>
      {detail ? <Detail detail={detail} /> : <ErrorComponent />}
    </div>
  );
}

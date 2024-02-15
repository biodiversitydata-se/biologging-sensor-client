'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../index.css';
import { Dataset } from '@/api/dataset/dataset.interface';
import Detail from './Detail';
import { getDataset } from '@/api/dataset/api';

function DetailPage({ params }: { params: { id: string } }) {
  const [detail, setDetailData] = useState<Dataset | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDataset(params.id);
        console.log(response)
        setDetailData(response);
      } catch (error) {
        if (error instanceof Error) {
          console.error('Error fetching data:', error.message);
        } else {
          console.error('Unexpected error:', error);
        }
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Detail detail={detail} />
    </div>
  );
}

export default DetailPage;

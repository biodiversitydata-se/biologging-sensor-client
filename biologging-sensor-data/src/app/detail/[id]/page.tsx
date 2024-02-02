'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../index.css';
import { Dataset } from '@/api/dataset/dataset.interface';
import Detail from './Detail';

function DetailPage({ params }: { params: { id: string } }) {
  const [detail, setDetailData] = useState<Dataset | null>(null);
  const apiUrl = `http://canmove-dev.ekol.lu.se:8080/sensorAPI/v1/dataset/${params.id}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        const data = response.data;
        setDetailData(data);
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

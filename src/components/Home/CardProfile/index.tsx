import Image from 'next/image'

import { allProfiles } from 'contentlayer/generated'

import * as S from './styles'

const CardProfile = () => {
  const { profile, name, description } = allProfiles.map((profile) => profile)[0]

  return (
    <S.WrapperCard data-testId="intro-home">
      <S.Picture>
        <Image
          className="w-full rounded-full shadow-sm"
          src={profile}
          width="0"
          height="0"
          alt="foto de perfil"
          sizes="100vw"
          style={{ width: '100%', height: 'auto' }}
          priority
        />
      </S.Picture>

      <S.Title>{name}</S.Title>
      <S.Bio>{description}</S.Bio>
    </S.WrapperCard>
  )
}

export default CardProfile